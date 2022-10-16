<template>
    <el-drawer v-model="state.visible" :before-close="handleClose" :title="articleId?'修改文章':'新增文章'" direction="rtl"
        size="800px" @opened="handleSearch">
        <div class="article-form" style="overflow-y: auto">
            <el-form label-suffix="：" label-width="120px">
                <el-form-item label="标题">
                    <el-input ref="articleTitle" v-model="state.article.title"></el-input>
                </el-form-item>
                <el-form-item label="所属分类">
                    <el-cascader v-model="state.catalogs" :options="state.catalogTree"
                        :props="{ checkStrictly: true, value:'id',label:'name',expandTrigger: 'hover'}" clearable
                        size="medium" style="width: 100%" />
                </el-form-item>
                <el-form-item label="标签">
                    <el-select v-model="state.article.tags" clearable multiple placeholder="请选择文章标签" size="medium"
                        style="width: 100%">
                        <el-option v-for="s in state.tags" :label="s.name" :value="s.id" :key="s.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input v-model="state.article.excerpt" :rows="5" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                    <v-md-editor v-model="state.article.markdown" height="600px"></v-md-editor>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload :before-upload="beforeAvatarUpload" :headers="csrfToken"
                        :on-success="handleAvatarSuccess" :show-file-list="false" action="/api/upload/"
                        class="avatar-uploader">
                        <img v-if="state.article.cover" :src="state.article.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="demo-drawer__footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button :loading="state.loading" type="primary" @click="saveArticle">保存</el-button>
        </div>
    </el-drawer>

</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref, watch } from "vue";
import { getArticleDetail, getCatalogTree, getTagList, remoteSaveArticle } from "../api/service";
import { Article, Catalog, Tag, TagList } from "../types";
import { getCookie } from "../utils";


const props = defineProps<{
    articleId: number;
    visible: boolean;
}>();
watch(() => props.visible, (val, oldVal) => handler(val, oldVal));
function handler(val: boolean, oldVal: boolean) {
    if (val !== oldVal) {
        state.visible = val
    }
}
const emit = defineEmits(["close",]);

const state = reactive({
    article: {} as Article,
    loading: false,
    visible: false as Boolean,
    catalogTree: [] as Array<Catalog>,
    tags: [] as Array<Tag>,
    catalogs: [] as Array<number>
})

const articleTitle = ref(null);

const saveArticle = async () => {
    try {
        state.loading = true
        if (state.catalogs.length) {
            state.article.catalog = state.catalogs[state.catalogs.length - 1]
        }
        if (props.articleId) {
            await remoteSaveArticle('put', state.article)
        } else {
            await remoteSaveArticle('post', state.article)
        }
        state.loading = false
        emit('close', true)
    } catch (e) {
        state.loading = false
    }
}
const csrfToken = { 'X-CSRFToken': getCookie('csrftoken') };


async function handleSearch() {
    articleTitle.value.focus()
    if (props.articleId) {
        state.article = await getArticleDetail(props.articleId)
        state.article.tags = state.article.tags_info.map((tag: Tag) => tag.id)
        state.catalogs = state.article.catalog_info.parents
    } else {
        state.article = {} as Article
    }
    state.catalogTree = await getCatalogTree()


    if (!state.tags.length) {
        const tags: TagList = await getTagList({})
        state.tags = tags.results
    }
}
function handleClose(done: any) {
    ElMessageBox.confirm('确认关闭抽屉?', '提示', {
        confirmButtonText: '关闭',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then((_: any): void => {
            emit("close", false)
            state.article = {} as Article
            done();
        })
        .catch((_: any): void => {
            console.error(_)
        });
}

function handleAvatarSuccess(res: any, file: File) {
    state.article.cover = res.url
}

function beforeAvatarUpload(file: File) {
    const isImage = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
        ElMessage.error('上传图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!');
    }
    return isImage && isLt2M;
}

</script>

<style lang="less">
.article-form {
    padding: 24px;
    overflow-y: auto;
    border-top: 1px solid #e8e8e8;
    height: calc(100% - 100px);
}


//抽屉//element-ui的drawer固定底部按钮
.el-drawer .el-drawer__body {
    margin-bottom: 50px;
    height: 100% !important;
}

.el-drawer__header {
    margin-bottom: 16px;
}

.demo-drawer__footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background-color: white;
}

//抽屉//去掉element-ui的drawer标题选中状态

:deep(:focus) {
    outline: 0;

}

.avatar-uploader {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 125px;
    height: 100px;
    cursor: pointer;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
}
</style>
