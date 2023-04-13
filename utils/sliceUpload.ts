import { uploadLargeFile } from "~~/api/video";
// 上传切片
export const  uploadChunk = async (formData:FormData):Promise<any> => {
    try {
      const res = await uploadLargeFile(formData)
      return res.data
    } catch (error) {
      console.error(error)
      return { status: 'error' }
    }
}