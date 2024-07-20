import type { TableDataItem, TableColumn, PaginationInfo, SearchFilter, QueryResult } from "@/components/data-grid/types";

export class dataTableService {
  static getAllColumns(): TableColumn[] {
    return [
      {
        prop: "date",
        label: "Date",
        width: "180"
      },
      {
        prop: "name",
        label: "Name",
        width: "180"
      },
      {
        prop: "adress",
        label: "Adress"
      }
    ];
  }

  static getAllData(): TableDataItem[] {
    return [];
  }

  static getPageData(pageInfo: PaginationInfo, searchFilter?: SearchFilter): QueryResult {
    const data = [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        date: "2016-05-02",
        name: "John",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        date: "2016-05-04",
        name: "Morgan",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        date: "2016-05-01",
        name: "Jessy",
        address: "No. 189, Grove St, Los Angeles"
      }
    ];

    return {
      totalCount: data.length,
      currPage: pageInfo.currPage,
      pageSize: pageInfo.pageSize,
      data
    };
  }
}
