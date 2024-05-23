export interface AppColumn {
  field: string
  header: string
  style?: string
  transform?: (v: any) => {}
  stylish?: (v: any) => {}
}

export interface ConrolTestCondition {
  field: string
  position?: 'base' | 'result' | 'test'
  validate?: '' | 'required'
  localization?: string
  type?: 'input' | 'number' | 'file' | 'textarea'
  readonly?: boolean
  fields?: ConrolTestCondition[]
}
