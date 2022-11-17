<!-- 标签的修改和新增 -->
<template>
    <el-dialog v-model="state.visible" :title="state.title" @close="handleClose(false)" width="440px">
        <el-form size="medium" label-suffix=":" class="form">
            <el-form-item label="名称" label-width="80px">
                <el-input v-model="state.name" autocomplete="off" size=""></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose(false)">取 消</el-button>
                <el-button :loading="loading" type="primary" @click="handleClose(true)">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { Tag } from "../types";

const props = defineProps<{
    visible: boolean,
    tag: Tag,
    loading: boolean,
}>();

const state = reactive({
    visible: props.visible as Boolean,
    //@ts-ignore
    name: '',
    //@ts-ignore
    title: ''
});

const emit = defineEmits(["close",]);

watch(
    () => props.visible, (val, oldVal) => handler(val, oldVal));

function handler(val: boolean, oldVal: boolean) {
    if (val !== oldVal) {
        state.visible = val
    }
    if (val) {
        state.name = props.tag.name
        state.title = props.tag.id ? '修改标签' : '新增标签'
    }
}

function handleClose(isOk: Boolean) {
    emit("close", {
        obj: {
            //@ts-ignore
            id: props.tag.id,
            name: state.name
        },
        isOk,
    })
}

</script>

<style scoped>
.form {
    padding-right: 24px;
}
</style>
