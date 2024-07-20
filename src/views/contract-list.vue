<template>
  <data-grid
    :columns="allColumns"
    :page-size="pageSize"
    :query-data-fn="dataTableService.getPageData"
  />
</template>

<script lang="ts" setup>
import type { TableColumn } from "@/components/data-grid/types";
import { computed, ref } from "vue";
import { dataTableService } from "@/service/data-table-service";
import DataGrid from "@/components/data-grid.vue";

const allColumns = computed<TableColumn[]>(() => dataTableService.getAllColumns());
const pageSize = ref(20);
</script>

<style scoped></style>
