import { useState } from 'react'
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadToCloudinary, getCloudinaryConfig } from '../../lib/cloudinary'

export default function CloudinaryUpload({ onUploadSuccess, className = '', label = 'Upload Image' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const { cloudName, uploadPreset } = getCloudinaryConfig()

    if (!cloudName || !uploadPreset) {
      setError('Please configure Cloudinary settings first (Cloud Name & Upload Preset).')
      return
    }

    setLoading(true)
    setError('')

    try {
      const imageUrl = await uploadToCloudinary(file)
      onUploadSuccess(imageUrl)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="inline-flex cursor-pointer items-center justify-center gap-2 border border-line bg-white px-3.5 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-3.5 w-3.5 text-gold" />
            {label}
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />
      </label>
      {error && <span className="text-[11px] text-red-600 font-medium">{error}</span>}
    </div>
  )
}
