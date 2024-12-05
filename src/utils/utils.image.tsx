import { uploadData, remove, getUrl } from 'aws-amplify/storage'

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const result = await uploadData({
      path: `images/${file.name}`,
      data: file,
    }).result
    return result.path
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteImage = async (path: string): Promise<void> => {
  try {
    await remove({ path })
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}

export const getImageUrl = async (path: string): Promise<string> => {
  try {
    const url = await getUrl({ path }).then((result) => result.url.toString())
    return url
  } catch (error) {
    console.error('Error getting image URL:', error)
    throw error
  }
}
