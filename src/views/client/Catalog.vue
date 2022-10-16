<!-- 表格查看评论 -->
<template>
    <div class="catalog">
        <div :style="{ 'min-height': height + 'px' }" class="catalog-tree">
            <el-tree :current-node-key="state.currentNodeKey" :data="state.catalogs" :props="defaultProps" node-key="id"
                @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="article-list">
            <Home />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { Article, ArticleParams, Catalog } from "../../types";
import { getCatalogTree } from "../../api/service";
import Home from "./Home.vue";
import { useStore } from "../../store";

const state = reactive({
    catalogs: [] as Array<Catalog>,
    articleParams: { catalog: 1 } as ArticleParams,
    articleList: [] as Array<Article>,
    currentNodeKey: 1,
});

const getCatalogs = async () => {
    state.catalogs = await getCatalogTree();
};

const defaultProps = {
    children: "children",
    label: "name",
};

const store = useStore();

onMounted(() => {
    getCatalogs();
    state.currentNodeKey = store.articleParams.catalog || 1;
});

let height = window.innerHeight || document.documentElement.clientHeight;
height = height - 200;
const handleNodeClick = (catalog: Catalog) => {
    store.setArticleParams({ catalog: catalog.id });
};

</script>

<style lang="less" scoped>
.catalog {
    display: flex;
}

.catalog-tree {
    width: 200px;
    border-right: 1px solid #eeeeee;
    margin-right: 24px;
    padding-top: 24px;
    margin-top: -12px;
    color: #2c3e50;
}

.article-list {
    width: 70%;
}
</style>
