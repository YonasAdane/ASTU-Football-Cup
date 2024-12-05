import cloudinary from './cloudinary.js';

// Cloudinary upload_stream function wrapped in a promise
export function uploadToCloudinary(fileBuffer,path) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: `ASTU-sport/${path}`, resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(fileBuffer); 
    });
}
export function uploadToCloudinaryByLink(fileAddress,path) {
    return cloudinary.uploader.upload(
            fileAddress,
            { folder: `ASTU-sport/${path}`, resource_type: "image" },
        ).then((data)=>{return data});
    }
 