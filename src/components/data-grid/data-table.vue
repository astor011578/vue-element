<template>
  <el-table
    :data="showData"
    border
    stripe
    fit
    show-overflow-tooltip
    style="width: 100%"
  >
    <el-table-column
      v-for="(col, index) in showColumns"
      :key="`data-table-${index}`"
      :prop="col?.prop"
      :label="col.label"
      :min-width="col?.minWidth ? col.minWidth : 100"
      :width="col?.width ? col.width : 80"
      :sortable="col?.sortable ? col.sortable : true"
      :resizable="col?.resizable ? col.resizable : true"
      :show-overflow-tooltip="col?.showOverflowTooltip ? col.showOverflowTooltip : true"
      :formatter="col?.formatter ? col.formatter : (row, column, cellValue) => { return cellValue }"
    />
  </el-table>
  <span>
    <span>
      <text> 總共找到 {{ pageInfo.dataCount }} 筆資料， </text>
      <text> 目前顯示第 {{ (pageInfo.currPage - 1) * pageInfo.pageSize }} ~ {{ pageInfo.currPage * pageInfo.pageSize }} 筆資料。 </text>
    </span>
    <el-pagination
      class="mt-4"
      size="small"
      background
      layout="prev, pager, next"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.dataCount"
      @current-change="changePageHandler"
    />
  </span>
</template>

<script setup lang="ts">
import type { TableDataItem, TableColumn, PaginationInfo, QueryResult, SearchFilter } from "@/components/data-grid/types";
import { computed, watch, ref, onMounted } from "vue";
import { ElTable, ElTableColumn, ElPagination } from "element-plus";

const props = defineProps<{
  tableColumns: TableColumn[];
  pageSize: number;
  searchFilter?: SearchFilter;
  queryDataFn: (pageInfo: PaginationInfo, searchFilter?: SearchFilter) => QueryResult;
  triggerToRedraw: number;
}>();

const showColumns = computed<TableColumn[]>(() => props.tableColumns.filter((col) => col.visible));
const showData = computed<TableDataItem[]>(() => [...queryResult.value.data]);

const currPage = ref<number>(1);
const pageInfo = computed<PaginationInfo>(() => {
  return {
    dataCount: queryResult.value.totalCount,
    pageSize: props.pageSize,
    pageCount: 0,
    currPage: currPage.value
  };
});

function changePageHandler(_currPage: number) {
  currPage.value = _currPage;
  redraw();
}

const queryResult = ref<QueryResult>({
  pageSize: 0,
  currPage: 0,
  totalCount: 0,
  data: []
});

const triggerToRedraw = computed(() => props.triggerToRedraw);
watch(triggerToRedraw, () => {
  redraw();
});

function redraw() {
  const result = props.queryDataFn(pageInfo.value, props?.searchFilter);
  queryResult.value = Object.assign({}, result);
}

onMounted(() => {
  redraw();
});
</script>

<style lang="css" scoped>
:deep(.text-red-500) {
  color: rgb(239 68 68);
}
</style>
