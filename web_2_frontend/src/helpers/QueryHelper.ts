export const makeQuery = (ids: number[]): string => {
  let result = `?items=${ids[0]}`
  ids.forEach((id) => {
    if (id !== ids[0]) {
      result += `&items=${id}`
    }
  })
  return result
}
