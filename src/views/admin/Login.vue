<!-- 管理员后台登录 -->
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="state.loginForm" :rules="rules" autocomplete="on" class="login-form"
      label-position="left">
      <div class="title-container">
        <h3 class="title">博客管理后台</h3>
      </div>

      <el-form-item prop="account">
        <el-input ref="account" v-model="state.loginForm.account" autocomplete="on" name="account" placeholder="Account"
          tabindex="1" type="text" />
      </el-form-item>

      <el-tooltip v-model="state.capsTooltip" content="Caps lock is On" manual placement="right">
        <el-form-item prop="password">
          <el-input :key="state.passwordType" ref="password" v-model="state.loginForm.password"
            :type="state.passwordType" autocomplete="on" name="password" placeholder="Password" tabindex="2"
            @blur="state.capsTooltip = false" @keyup="checkCapslock" @keyup.enter="handleLogin(loginForm)" />
        </el-form-item>
      </el-tooltip>
      <p class="fp" @click="startFp(loginForm)">Forget password</p>

      <el-button :loading="state.loading" style="width: 100%; margin-bottom: 30px" type="primary"
        @click.prevent="handleLogin(loginForm)">
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { AxiosResponse } from "axios";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
// import 'element-plus/es/components/message-box/style'
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { forgetPassword, login } from "../../api/service";
import router from "../../router";
import { useStore } from "../../store";
import { ResponseData, ResponseDataAxios, State, User } from "../../types";

// DOM operation
const account = ref(null);
const password = ref(null);
const loginForm = ref(null);

const store = useStore();

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
};
const state = reactive<State>({
  loginForm: {
    account: "",
    password: "",
  },
  loginRules: {
    account: [{ required: true, trigger: "blur" }],
    password: [
      {
        required: true,
        trigger: "blur",
        validator: validatePassword,
      },
    ],
  },
  forgetRules: {
    account: [{ required: true, trigger: "blur" }],
  },
  passwordType: "password",
  capsTooltip: false,
  loading: false,
  //是否忘记密码
  isFP: false,
});

onMounted(() => {
  if (state.loginForm.account === "") {

    account.value.focus();
  } else if (state.loginForm.password === "") {

    password.value.focus();
  }
});

const rules = computed(() => {
  return state.isFP ? state.forgetRules : state.loginRules;
})

function checkCapslock(e: KeyboardEvent) {
  const { key } = e;
  state.capsTooltip = Boolean(key && key.length === 1 && key >= "A" && key <= "Z");
};

//管理员登录
function handleLogin(loginForm: FormInstance | undefined) {
  state.isFP = false;
  //validate: (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>
  loginForm!.validate(async (valid: Boolean) => {
    if (valid) {
      state.loading = true;
      const req = {
        username: state.loginForm.account,
        password: state.loginForm.password,
      };
      try {
        const data: any = await login(req);
        // const data=res.data;
        const user: User = {
          id: data.id,
          username: data.username,
          avatar: data.avatar,
          email: data.email,
          nickname: data.nickname,
          is_superuser: data.is_superuser
        };
        //debug
        console.log(data);
        store.setUser(user);
        window.sessionStorage.userInfo = JSON.stringify(user);
        await router.push({
          path: "/admin",
        });
        state.loading = false;
      } catch (e) {
        ElMessage.error(e.message);
        state.loading = false;
      }
    }
  });
};

//忘记密码处理逻辑
function startFp(loginForm: FormInstance | undefined) {
  state.isFP = true;
  loginForm!.clearValidate();
  nextTick(() => {
    loginForm!.validate((valid: Boolean) => {
      if (valid) {
        ElMessageBox.confirm(
          "We will send a new password to " + state.loginForm.account, "Tip",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          forgetPassword({ account: state.loginForm.account }).then((data: AxiosResponse<any>) => {
            if (!(data.data).error) {
              ElMessage.success({
                message: 'success!',
                duration: 1.5 * 1000,
              });
            }
          });
        });
      }
    });
  });
};
</script>


<style lang="less" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: hue-rotate(200deg);
}

.login-form {
  //position: absolute;
  width: 300px;
  max-width: 100%;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 350px;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
}

.tips span:first-of-type {
  margin-right: 16px;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;
  color: #333;
}

.title-container .title {
  font-size: 40px;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}

.thirdparty-button {
  position: absolute;
  right: 0;
  bottom: 6px;
}

.fp {
  font-size: 12px;
  text-align: right;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>