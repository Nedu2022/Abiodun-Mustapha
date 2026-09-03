// Utility to handle Cloudinary image uploads

export function getCloudinaryConfig() {
  const storedName = typeof window !== 'undefined' ? localStorage.getItem('cloudinary_cloud_name') : null
  const storedPreset = typeof window !== 'undefined' ? localStorage.getItem('cloudinary_upload_preset') : null

  return {
    cloudName: storedName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: storedPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  }
}

export function setCloudinaryConfig(cloudName, uploadPreset) {
  if (typeof window !== 'undefined') {
    if (cloudName) localStorage.setItem('cloudinary_cloud_name', cloudName)
    else localStorage.removeItem('cloudinary_cloud_name')

    if (uploadPreset) localStorage.setItem('cloudinary_upload_preset', uploadPreset)
    else localStorage.removeItem('cloudinary_upload_preset')
  }
}

export async function uploadToCloudinary(file, customCloudName, customUploadPreset) {
  const config = getCloudinaryConfig()
  const cloudName = customCloudName || config.cloudName
  const uploadPreset = customUploadPreset || config.uploadPreset

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary Cloud Name and Upload Preset are required. Please configure them in Admin settings.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary')
  }

  const data = await response.json()
  return data.secure_url
}
