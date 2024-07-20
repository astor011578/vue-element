<template>
  <el-checkbox
    v-model="columnInfo.visible"
    :disabled="columnInfo.disabled"
    @change="(checked: boolean) => checkedHandler(columnInfo.prop, checked)"
  >
    {{ columnInfo.label }}
  </el-checkbox>
</template>

<script setup lang="ts">
import type { TableColumn } from "@/components/data-grid/types";
import { onMounted, ref } from "vue";

const props = defineProps<{
  tableColumn: TableColumn;
}>();

const columnInfo = ref<TableColumn>({ label: "" });
onMounted(() => {
  columnInfo.value = props.tableColumn;
});

const emits = defineEmits<{
  getColumnVisibility: [propName: string, checked: boolean];
}>();

function checkedHandler(propName: string, checked: boolean) {
  emits("getColumnVisibility", propName, checked);
}
</script>
