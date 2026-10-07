import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadMedia(
  fileBuffer: Buffer,
  folder: string = 'shipfolio'
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload failed'));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export function getOptimizedUrl(
  publicId: string,
  platform: 'linkedin' | 'twitter' | 'reddit' | 'medium'
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

  switch (platform) {
    case 'linkedin':
      // 1200x627 landscape card
      return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_1200,h_627,f_auto,q_auto/${publicId}`;
    case 'twitter':
      // 1200x675 Twitter summary large image
      return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_1200,h_675,f_auto,q_auto/${publicId}`;
    case 'reddit':
      // 800 width responsive web
      return `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_800,f_auto,q_auto/${publicId}`;
    case 'medium':
      // 1000 width article header
      return `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_1000,f_auto,q_auto/${publicId}`;
    default:
      return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
  }
}
