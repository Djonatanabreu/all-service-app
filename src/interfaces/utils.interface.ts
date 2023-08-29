export type ResponseError = {
  response: {
    status: number,
    data: {
      message: string
    }
  }
}
