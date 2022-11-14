<!-- 新增评论 -->
<template>
    <!-- 评论文章 -->
    <div v-if="forArticle" class="comment">
        <el-input v-model="state.content" placeholder="文明社会，理性评论" type="textarea" />
        <el-button :loading="state.btnLoading" style="margin-top: 15px" type="primary" @click="handleOk">
            发 送
        </el-button>
    </div>

    <!--首先是v-else，，其次是与 state.showDialog 绑定，评论回复-->
    <el-dialog v-else v-model="state.showDialog" title="评论" width="60%" @close="cancel">
        <el-form>
            <el-form-item>
                <el-input v-model="state.content" autocomplete="off" placeholder="文明社会，理性评论" type="textarea" />
            </el-form-item>
        </el-form>
        <template v-slot:footer>
            <div class="dialog-footer">
                <el-button type="default" @click="cancel">取消</el-button>
                <el-button type="primary" @click="handleOk">确 定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { reactive, watch } from "vue";
import { addComment } from "../api/service";
import { useStore } from "../store";
import { CommentPara } from "../types";

const props = defineProps({
    forArticle: {
        type: Boolean,
        require: true,
    },
    showDialog: {
        type: Boolean,
        default: false,
    },
    article_id: {
        type: Number,
        require: true,
    },
    reply: {
        type: Number,
        default: undefined,
    },
});
const emit = defineEmits(["ok", "cancel"]);
const state = reactive({
    showDialog: props.showDialog,
    btnLoading: false,
    content: "",
    cacheTime: 0, // 缓存时间
    times: 0, // 留言次数
});
const store = useStore();
const cancel = (): boolean => {
    emit("cancel", false);
    return false;
};

const handleOk = async (): Promise<void> => {
    if (!props.article_id) {
        ElMessage({
            message: "该文章不存在！",
            type: "error",
        });
        return;
    }

    if (state.times > 2) {
        ElMessage({
            message: "您今天评论的次数已经用完，明天再来评论吧！",
            type: "warning",
        });
        return;
    }

    let now = new Date();
    let nowTime = now.getTime();
    if (nowTime - state.cacheTime < 4000) {
        ElMessage({
            message: "您评论太过频繁，1 分钟后再来评论吧！",
            type: "warning",
        });
        return;
    }

    if (!state.content) {
        ElMessage({
            message: "评论内容不能为空",
            type: "error",
        });
        return;
    }

    let user_id: number;
    if (store.user.id > 0) {
        user_id = store.user.id;
    } else {
        ElMessage({
            message: "登录才能评论，请先登录！",
            type: "warning",
        });
        return;
    }
    state.btnLoading = true;
    try {
        await addComment({
            article: props.article_id,
            user: user_id,
            reply: props.reply,
            content: state.content,
        } as unknown as CommentPara);
        state.btnLoading = false;
        state.times++;

        state.cacheTime = nowTime;
        state.content = "";
        emit("ok", false);
        ElMessage({
            message: "评论成功",
            type: "success",
        });
    } catch (e) {
        ElMessage({
            message: "评论失败，请重试哦",
            type: "success",
        });
        state.btnLoading = false;
    }
};

watch(props, (val, oldVal) => {
    state.showDialog = val.showDialog;
});

</script>
<style scoped>
.dialog-footer {
    text-align: right;
}
</style>
