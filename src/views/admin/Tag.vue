<template>
    <div>
        <div>
            <el-form :inline="true" :model="state.params" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="state.params.name" placeholder="名称" />
                </el-form-item>
                <el-form-item>
                    <el-button :loading="state.isLoading" type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="button-container">
            <el-button :loading="state.isLoading" type="primary" @click="showAddDialog"><i class="el-icon-plus" /> 新 增
            </el-button>
        </div>
        <div>
            <el-table ref="tagTable" :data="state.tagList"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }" stripe>
                <el-table-column type="selection" width="55" />
                <el-table-column label="ID" prop="id" width="80" />
                <el-table-column label="名称" prop="name" width="200" />
                <el-table-column :formatter="datetimeFormatter" label="修改时间" prop="modified_at" />
                <el-table-column fixed="right" label="操作" width="120">

                    <template #default="scope">
                        <el-popconfirm cancelButtonText="取消" confirmButtonText="删除" :icon="InfoFilled" iconColor="red"
                            title="确定删除系列吗？" @confirm="deleteObject(scope.$index, scope.row)">
                            <template #reference>
                                <el-button size="small" type="text"> 删除 </el-button>
                            </template>
                        </el-popconfirm>
                        <!-- 编辑可以新增和修改 -->
                        <el-button size="small" type="text" @click.prevent="showEditDialog(scope.$index, scope.row)">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination :page-size="10" :total="state.total" background layout="prev, pager, next"></el-pagination>
        </div>
    </div>

    <TagEditDialog :loading="state.saveLoading" :tag="state.tag" :visible="state.showDialog"
        @close="handleCloseDialog" />
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { ResponseData, Tag } from "../../types";
import { addTag, deleteTag, getTagList, saveTag } from "../../api/service";
import { timestampToTime } from "../../utils";
import { ElMessage } from "element-plus";
import TagEditDialog from "../../components/TagEditDialog.vue";
import { useRoute } from "vue-router";
import { InfoFilled } from '@element-plus/icons-vue'

const route = useRoute();
watch(() => route.path, (val, oldVal) => handler(val, oldVal),
    { deep: true, }
);

function handler(val: any, oldVal: any) {
    if (val !== oldVal && ["/admin/tag"].includes(val)) handleSearch();
}

const state = reactive({
    tagList: [] as Array<Tag>,
    params: {
        name: undefined,
        page: 1,
        page_size: 10,
    },
    isLoading: false,
    total: 0,
    showDialog: false,
    tag: {
        id: 0,
        name: "",
    } as Tag,
    saveLoading: false,
});

//获取当前taglist，更新页面
const handleSearch = async (): Promise<void> => {
    state.isLoading = true;
    try {
        const data: ResponseData = await getTagList(state.params);
        state.isLoading = false;
        // debug
        console.log(data);
        state.tagList = data.results;
        state.total = data.count;
    } catch (e) {
        console.error(e);
        state.isLoading = false;
    }
};

//删除tag
const deleteObject = async (index: number, row: Tag) => {
    await deleteTag(row.id);
    ElMessage({
        message: "删除成功！",
        type: "success",
    });
    await handleSearch();
};

const datetimeFormatter = (
    row: Tag,
    column: number,
    cellValue: string,
    index: number
) => {
    return timestampToTime(cellValue, true);
};

function showEditDialog(index: number, row: Tag) {
    state.tag = row;
    state.showDialog = true;
};

function showAddDialog() {
    state.tag = {} as Tag;
    state.showDialog = true;
};

//增、改标签
async function handleCloseDialog(params: any) {
    if (!params.isOk) {
        state.showDialog = false;
        return;
    }
    state.saveLoading = true;
    const method = state.tag.id ? "put" : "post";
    try {
        await saveTag(method, params.obj);
        state.showDialog = false;
        state.saveLoading = false;
        await handleSearch();
    } catch (e) {
        console.error(e);
        state.saveLoading = false;
    }
}

handleSearch();

</script>

<style scoped>
.pagination {
    text-align: right;
    margin-top: 12px;
}
</style>
