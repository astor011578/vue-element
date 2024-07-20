import type { TableDataItem, TableColumn, PaginationInfo, SearchFilter, QueryResult } from "@/components/data-grid/types";

export class dataTableService {
  static getAllColumns(): TableColumn[] {
    return [
      {
        prop: "index",
        label: "Index",
        width: "100",
        visible: true
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

  static getAllData(): TableDataItem[] {
    return [];
  }

  static getPageData(pageInfo: PaginationInfo, searchFilter?: SearchFilter): QueryResult {
    const allData: TableDataItem[] = [];
    for (let i = 0; i < 10; i++) {
      Array.prototype.push.apply(allData, [
        {
          date: "2016-05-03",
          name: `Tom${i}`,
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: `John${i}`,
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: `Morgan${i}`,
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: `Jessy${i}`,
          address: "No. 189, Grove St, Los Angeles"
        }
      ]);
    }

    const startIndex = (pageInfo.currPage - 1) * pageInfo.pageSize;
    const endIndex = pageInfo.currPage * pageInfo.pageSize;
    const data = allData
      .map((item, index) => {
        item.index = index + 1;
        return item;
      })
      .slice(startIndex, endIndex);

    console.log(startIndex, endIndex, data[0]);
    return {
      totalCount: allData.length,
      currPage: pageInfo.currPage,
      pageSize: pageInfo.pageSize,
      data
    };
  }
}
