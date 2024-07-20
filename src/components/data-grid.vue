<template>
  <boolean-searcher @get-search-filter="getSearchFilter" />
  <column-visibility
    v-for="col in tableColumns.filter((col) => col.prop !== 'index')"
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
import { onMounted, ref } from "vue";
import BooleanSearcher from "@/components/data-grid/boolean-searcher.vue";
import ColumnVisibility from "@/components/data-grid/column-visibility.vue";
import DataTable from "@/components/data-grid/data-table.vue";

const triggerToRedraw = ref(0);
let searchFilter = ref({});
let tableColumns = ref<TableColumn[]>([]);
const props = defineProps<{
  columns: TableColumn[];
  pageSize: number;
  queryDataFn: (pageInfo: PaginationInfo, searchFilter?: SearchFilter) => QueryResult;
}>();

function getColumnVisibility(colPropName: string, colVisible: boolean) {
  tableColumns.value = [
    ...tableColumns.value.map((col) => {
      const newCol = Object.assign({}, col);
      newCol.visible = col.prop === colPropName ? colVisible : col.visible;
      return newCol;
    })
  ];
  triggerToRedraw.value++;
}

function getSearchFilter(filter: SearchFilter) {
  searchFilter.value = Object.assign({}, filter);
  triggerToRedraw.value++;
}

onMounted(() => {
  tableColumns.value = [...props.columns];
});
</script>

<style scoped></style>
