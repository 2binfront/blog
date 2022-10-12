<template>
    <el-drawer v-model="state.visible" :before-close="handleClose" direction="rtl" size="500px" title="用户详情"
        @opened="handleSearch">
        <el-descriptions :column="1" border class="detail">
            <el-descriptions-item label="用户名">{{ state.user.username }}</el-descriptions-item>
            <el-descriptions-item label="角色">{{ store.user.is_superuser? 'admin' : 'user' }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ state.user.is_active }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ state.user.email }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ state.user.created_at }}</el-descriptions-item>
            <el-descriptions-item label="最后登录时间">{{ state.user.last_login }}</el-descriptions-item>
        </el-descriptions>
    </el-drawer>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { User } from "../types";
import { getUserDetail } from "../api/service";
import { useStore } from "../store";

const props = defineProps<{
    visible: boolean,
    userId: number,
    //loading: boolean
}>();

const store=useStore();

const state = reactive({
    visible: props.visible,
    user: {} as User,
});

const emit = defineEmits(["close"]);
watch(() => props.visible, (val, oldVal) => handler(val, oldVal));

async function handler(val: boolean, oldVal: boolean) {
    if (val !== oldVal) {
        state.visible = val;
    }
}

function handleClose(isOk: boolean) {
    emit("close", {
        user: state.user,
        isOk,
    })
}

async function handleSearch() {
    state.user = await getUserDetail(props.userId)
}
</script>

<style scoped>
.detail {
    padding: 24px;
    margin-top: -12px;
    border-top: #eeeeee 1px solid;
}
</style>
