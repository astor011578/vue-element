import type { TableDataItem, TableColumn, PaginationInfo, SearchFilter, QueryResult } from "@/components/data-grid/types";
import { VNode, h } from "vue";

export class dataTableService {
  /**
   * @description 取得所有 Column 定義
   * @returns TableColumns
   */
  static getAllColumns(): TableColumn[] {
    return [
      {
        prop: "index",
        label: "Index",
        width: "100",
        visible: true
      },
      {
        prop: "urgentLevel",
        label: "Urgent Level",
        width: 180,
        visible: true,
        disabled: false,
        formatter: renderUrgentLevel
      },
      {
        prop: "date",
        label: "Date",
        width: "180",
        visible: true,
        disabled: true
      },
      {
        prop: "name",
        label: "Name",
        width: "180",
        visible: true,
        disabled: true
      },
      {
        prop: "address",
        label: "Address",
        visible: true,
        disabled: false
      }
    ];
  }

  /**
   * @description 取得所有 Data
   * @returns TableData
   */
  static getAllData(): TableDataItem[] {
    return [];
  }

  /**
   * @description 根據篩選條件 (pageInfo, searchFilter) 取得資料
   * @param pageInfo
   * @param searchFilter
   * @returns TableData
   */
  static getPageData(pageInfo: PaginationInfo, searchFilter?: SearchFilter): QueryResult {
    const fetchResult = getFakeData(17, pageInfo, searchFilter);
    return fetchResult;
  }
}

/**
 * @description urgentLevel 的渲染函數
 */
function renderUrgentLevel(row: any, column: any, cellValue: any, index: number): VNode {
  const { urgentLevel, urgentLevelId } = row;
  const urgentLevelClass = urgentLevelId === 2 ? "text-red-500" : "";

  return h("text", { class: urgentLevelClass }, urgentLevel);
}

/**
 * @description 取得假資料來源
 * @param iterationCount 資料要重複增加幾次
 * @returns fakeData
 */
function getFakeData(iterationCount: number, pageInfo: PaginationInfo, searchFilter?: SearchFilter): QueryResult {
  const fakeData: TableDataItem[] = [];
  for (let i = 0; i < iterationCount; i++) {
    Array.prototype.push.apply(fakeData, [
      {
        date: "2016-05-03",
        name: `Tom${i}`,
        address: "No. 189, Grove St, Los Angeles",
        urgentLevel: "一般案件",
        urgentLevelId: 1
      },
      {
        date: "2016-05-02",
        name: `John${i}`,
        address: "No. 187, Grove St, Los Angeles",
        urgentLevel: "緊急案件",
        urgentLevelId: 2
      },
      {
        date: "2016-05-04",
        name: `Morgan${i}`,
        address: "No. 183, Grove St, Los Angeles",
        urgentLevel: "一般案件",
        urgentLevelId: 1
      },
      {
        date: "2016-05-01",
        name: `Jessy${i}`,
        address: "No. 185, Grove St, Los Angeles",
        urgentLevel: "一般案件",
        urgentLevelId: 1
      }
    ]);
  }

  const startIndex = (pageInfo.currPage - 1) * pageInfo.pageSize;
  const endIndex = pageInfo.currPage * pageInfo.pageSize;
  const pageData = fakeData
    .map((item, index) => {
      item.index = index + 1;
      return item;
    })
    .slice(startIndex, endIndex);

  return {
    totalCount: fakeData.length,
    currPage: pageInfo.currPage,
    pageSize: pageInfo.pageSize,
    data: pageData
  };
}
