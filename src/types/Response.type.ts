type Response = {
    status: "success" | "failed"
    message: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
  }
  
  export default Response
  