export const base64ToBlob = (base64Image: string): Blob => {
  const decodedData = window.atob(base64Image)
  const uIntArray = new Uint8Array(decodedData.length)

  for (let i = 0; i < decodedData.length; ++i) {
    uIntArray[i] = decodedData.charCodeAt(i)
  }

  return new Blob([uIntArray], { type: 'image/png' })
}
