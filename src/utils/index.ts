export const getRequestJSON = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Something went wrong.")
  return await response.json()
}

export const postRequest = async (url: string, body: any) => {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) throw new Error("Something went wrong.")
  return await response.json()
}