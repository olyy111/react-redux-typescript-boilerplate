/** TodoMVC model definitions **/

export interface DemoModel {
  data: any[],
  loading: boolean,
  pagination: {
    current: number,
    pageSize: number,
    total: number
  }
}

export namespace DemoModel {

}
