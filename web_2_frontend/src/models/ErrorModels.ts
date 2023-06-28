export interface ErrorData {
  ErrorId: string
  Exception: string
  Messages: string[]
  Source: string
  StatusCode: number
  SupportMessage: string
}

export interface PayPalError {
  name: string
  details: [
    {
      field: string
      value: string
      issue: string
      description: string
    }
  ]
}
