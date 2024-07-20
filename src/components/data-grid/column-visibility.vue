<template>
  <el-checkbox
    v-model="columnInfo.visible"
    disabled="columnInfo.disabled"
    @change="(checked: boolean) => checkedHandler(columnInfo.prop, checked)"
  >
    {{ columnInfo.label }}
  </el-checkbox>
</template>

<script setup lang="ts">
import type { TableColumn } from "@/components/data-grid/types";
import { onMounted, reactive } from "vue";

const props = defineProps<{
  tableColumn: TableColumn;
}>();

const columnInfo = reactive<TableColumn>({ label: "" });
onMounted(() => {
  const { label, prop, visible, disabled } = props.tableColumn;
  columnInfo.label = label;
  columnInfo.prop = prop;
  columnInfo.visible = visible;
  columnInfo.disabled = disabled;
});

const emits = defineEmits<{
  getColumnVisibility: [propName: string, checked: boolean];
}>();

function checkedHandler(propName: string, checked: boolean) {
  emits("getColumnVisibility", propName, checked);
}
</script>
