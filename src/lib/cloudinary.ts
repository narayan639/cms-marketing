import cloudinary from 'cloudinary';


    cloudinary.v2.config({
        secure: true,
        cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET
      });

    export default cloudinary