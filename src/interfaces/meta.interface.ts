export interface AppColumn {
  field: string
  header: string
  style?: string
  transform?: (v: any) => {}
  stylish?: (v: any) => {}
}
