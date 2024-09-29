export const imageBase64ToBlob = async (imageBase64: string): Promise<Blob> => {
  const base64Response = await fetch(`data:image/png;base64,${imageBase64}`)
  const blob = await base64Response.blob()

  return blob
}
