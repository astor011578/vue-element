<template>
  <el-table
    :data="showData"
    border
    stripe
    fit
    style="width: 100%"
  >
    <el-table-column
      v-for="(col, index) in showColumns"
      :key="`data-table-${index}`"
      :type="col?.type"
      :prop="col?.prop"
      :label="col.label"
      :min-width="col?.minWidth ? col.minWidth : 50"
      :width="col?.width ? col.width : 80"
      :sortable="col?.sortable ? col.sortable : true"
      :resizable="col?.resizable ? col.resizable : true"
      :show-overflow-tooltip="col?.showOverflowTooltip ? col.showOverflowTooltip : true"
      :formatter="col?.formatter ? col.formatter : null"
    >
      <template
        #default
        v-if="col.slotContent"
        v-html="col?.slotContent"
      >
      </template>
      <template
        #default="{ row, $index }"
        v-else
      >
        {{ row[col.prop] ? row[col.prop] : $index }}
      </template>
    </el-table-column>
  </el-table>
  <span>
    <span>
      <text> 總共找到 {{ pageInfo.dataCount }} 筆資料， </text>
      <text> 目前顯示第 {{ pageInfo.currPage * pageInfo.pageSize }} ~ {{ (pageInfo.currPage + 1) * pageInfo.pageSize }} 筆資料。 </text>
    </span>
    <el-pagination
      class="mt-4"
      size="small"
      background
      layout="prev, pager, next"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.dataCount"
      :current-page="pageInfo.currPage"
      @current-change="changePageHandler"
    />
  </span>
</template>

<script setup lang="ts">
import type { TableDataItem, TableColumn, PaginationInfo, QueryResult, SearchFilter } from "@/components/data-grid/types";
import { computed, watch, reactive } from "vue";
import { ElTable, ElTableColumn, ElPagination } from "element-plus";

const props = defineProps<{
  tableColumns: TableColumn[];
  pageSize: number;
  searchFilter?: SearchFilter;
  queryDataFn: (pageInfo: PaginationInfo, searchFilter?: SearchFilter) => QueryResult;
  triggerToRedraw: number;
}>();

const showColumns = computed<TableColumn[]>(() => props.tableColumns.filter((col) => col.visible));
const showData = computed<TableDataItem[]>(() => [...queryResult.data]);

const pageInfo = computed<PaginationInfo>(() => {
  return {
    dataCount: queryResult.totalCount,
    pageSize: props.pageSize,
    pageCount: 0,
    currPage: 0
  };
});

function changePageHandler(currPage: number) {
  pageInfo.value.currPage = currPage;
  redraw();
}

let queryResult = reactive<QueryResult>({
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
  queryResult = result;
}
</script>

<style scoped></style>
