<template>
  <boolean-searcher @get-search-filter="getSearchFilter" />
  <column-visibility
    v-for="col in tableColumns"
    :key="`column-visibility-${col.prop}`"
    :table-column="col"
    @get-column-visibility="getColumnVisibility"
  />
  <data-table
    :table-columns="tableColumns"
    :page-size="pageSize"
    :search-filter="searchFilter"
    :query-data-fn="props.queryDataFn"
    :triggerToRedraw="triggerToRedraw"
  />
</template>

<script setup lang="ts">
import type { PaginationInfo, QueryResult, SearchFilter, TableColumn } from "@/components/data-grid/types";
import { onMounted, reactive, ref } from "vue";
import BooleanSearcher from "@/components/data-grid/boolean-searcher.vue";
import ColumnVisibility from "@/components/data-grid/column-visibility.vue";
import DataTable from "@/components/data-grid/data-table.vue";

const triggerToRedraw = ref(0);
let searchFilter = reactive({});
let tableColumns = reactive<TableColumn[]>([]);
const props = defineProps<{
  columns: TableColumn[];
  pageSize: number;
  queryDataFn: (pageInfo: PaginationInfo, searchFilter?: SearchFilter) => QueryResult;
}>();

function getColumnVisibility(colPropName: string, colVisible: boolean) {
  tableColumns = [
    ...tableColumns.map((col) => {
      const newCol = Object.assign({}, col);
      newCol.visible = col.prop === colPropName ? colVisible : col.visible;
      return newCol;
    })
  ];
  triggerToRedraw.value++;
}

function getSearchFilter(filter: Object) {
  searchFilter = Object.assign({}, filter);
  triggerToRedraw.value++;
}

onMounted(() => {
  tableColumns = [...props.columns];
});
</script>

<style scoped></style>
