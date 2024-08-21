import { ElTableColumn } from "element-plus";

export type TableDataItem = Record<string, any>;

export type TableColumn = {
  visible?: boolean; //是否要顯示此欄位
  disabled?: boolean; //是否可以變更此欄位勾選框的值
  label?: (typeof ElTableColumn)["label"];
  prop?: (typeof ElTableColumn)["prop"];
  width?: (typeof ElTableColumn)["width"];
  minWidth?: (typeof ElTableColumn)["minWidth"];
  sortable?: (typeof ElTableColumn)["sortable"];
  resizable?: (typeof ElTableColumn)["resizable"];
  align?: (typeof ElTableColumn)["align"];
  headerAlign?: (typeof ElTableColumn)["headerAlign"];
  showOverflowTooltip?: (typeof ElTableColumn)["showOverflowTooltip"];
  className?: (typeof ElTableColumn)["className"];
  formatter?: (typeof ElTableColumn)["formatter"];
};

export type PaginationInfo = {
  dataCount?: number; //資料總筆數
  pageCount: number; //總頁數
  pageSize: number; //每頁幾筆資料
  currPage: number; //目前第幾頁
};

export type QueryResult = {
  totalCount: number; //資料總筆數
  currPage: number; //目前第幾頁
  pageSize: number; //每頁幾筆資料
  data: TableDataItem[]; //當前頁應顯示的資料內容
};

export type SearchFilter = {};
