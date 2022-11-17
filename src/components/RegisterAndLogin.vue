<template>
    <el-dialog title="登录" width="40%" v-model="state.dialogModel" @close="cancel" :show-close="true">
        <el-form>
            <el-formItem label="账号" :label-width="state.formLabelWidth">
                <el-input v-model="state.params.username" placeholder="请输入有效邮箱" autocomplete="off" />
            </el-formItem>
            <el-formItem label="密码" :label-width="state.formLabelWidth">
                <el-input type="password" placeholder="密码" v-model="state.params.password" autocomplete="off" />
            </el-formItem>
            <el-formItem v-if="isRegister" label="昵称" :label-width="state.formLabelWidth">
                <el-input v-model="state.params.nickname" placeholder="用户名或昵称" autocomplete="off" />
            </el-formItem>
            <!-- <el-formItem v-if="isRegister" label="手机" :label-width="state.formLabelWidth">
                <el-input v-model="state.params.phone" placeholder="手机号" autocomplete="off" />
            </el-formItem> -->
            <!-- <el-formItem v-if="isRegister" label="简介" :label-width="state.formLabelWidth">
                <el-input v-model="state.params.desc" placeholder="个人简介" autocomplete="off" />
            </el-formItem> -->
        </el-form>
        <!-- 登录组件下面放个登录和注册组成的footer -->
        <template v-slot:footer>
            <div class="dialog-footer">
                <el-button v-if="isLogin" :loading="state.btnLoading" type="primary" @click="handleOk">
                    登 录
                </el-button>
                <el-button v-if="isRegister" :loading="state.btnLoading" type="primary" @click="handleOk">注 册
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useStore } from "../store";
import { login, register } from "../api/service";
import { User } from "../types";
import { ElMessage } from "element-plus";

//这种写法更好，能设置默认值
const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    handleFlag: {
        type: String,
        default: false,
    },
});


const isLogin = computed((): boolean => {
    return props.handleFlag === "login";
})
const isRegister = computed((): boolean => {
    return props.handleFlag === "register";
})

const emit = defineEmits(["ok", "cancel"]);
const store = useStore();
const state = reactive({
    dialogModel: props.visible,
    btnLoading: false,
    loading: false,
    formLabelWidth: "60px",
    params: {
        email: "",
        username: "",
        nickname: "",
        password: "",
        is_active: true,
        avatar: "",
    },
});
// is_active: true,
//last_login: Date.now(),
// desc: "",

// ! 提交登录信息（仅注册有效，需处理后端接口）
const submit = async (): Promise<void> => {
    let data: any = "";
    state.btnLoading = true;
    //debug
    console.log(state.params)
    try {
        if (props.handleFlag === "register") {
            state.params.email = state.params.username;
            data = await register(state.params);
        } else {
            //debug
            console.log(state.params)
            return;
            //data = await login(state.params);
        }
        const user: User = {
            id: data.id,
            username: data.username,
            avatar: data.avatar,
            email: data.email,
            nickname: data.nickname,
            last_login: data.last_login,
            is_superuser: false
        };
        store.setUser(user);
        window.sessionStorage.userInfo = JSON.stringify(user);
        emit("ok", false);
        (() => ElMessage.success("get in successfully"))();
        state.dialogModel = false;
    } catch (e) {
        console.error(e);
        state.btnLoading = false;
    }
};

//前端表单校验
const handleOk = (): void => {
    const reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+.){1,63}[a-z0-9]+$"
    ); //正则表达式
    if (!state.params.username) {
        ElMessage({
            message: "账号不能为空！",
            type: "warning",
        });
        return;
    } else if (!reg.test(state.params.username)) {
        ElMessage({
            message: "请输入格式正确的邮箱！",
            type: "warning",
        });
        return;
    }
    if (props.handleFlag === "register") {
        if (!state.params.password) {
            ElMessage({
                message: "密码不能为空！",
                type: "warning",
            });
            return;
        } else if (!state.params.nickname) {
            ElMessage({
                message: "昵称不能为空！",
                type: "warning",
            });
            return;
        }
        submit();
    };
}
const cancel = (): boolean => {
    emit("cancel", false);
    return false;
};

watch(props, (val, oldVal) => {
    state.dialogModel = val.visible;
});
</script>

<style scoped>
.dialog-footer {
    text-align: right;
}
</style>
