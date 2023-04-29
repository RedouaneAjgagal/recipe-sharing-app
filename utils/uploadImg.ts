import { UploadedFile } from "express-fileupload"
import { BadRequestError } from "../errors";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import path from "path";


const tmpPath = path.join(__dirname, '../..', 'tmp');

const uploadImage = async (uploadedFile: UploadedFile) => {

    // find the picture
    if (!uploadedFile) {
        throw new BadRequestError('Must provide an image');
    }

    // check if its an image
    if (!uploadedFile.mimetype.startsWith("image")) {
        fs.rmSync(tmpPath, { recursive: true, force: true });
        throw new BadRequestError('Only images are supported');
    }

    // check if the image is less than 1MB
    const maxSize = 1024 * 1024;
    if (uploadedFile.size > maxSize) {
        fs.rmSync(tmpPath, { recursive: true, force: true });
        throw new BadRequestError('Image size must be less than 1MB');
    }

    // Upload the image to cloudinary
    const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
        folder: "recipe-sharing-app",
        resource_type: "image",
        format: "webp"
    });

    // remove the tmp folder
    fs.rmSync(tmpPath, { recursive: true, force: true });

    // return the url
    return result.secure_url;
}

const uploadImages = async (uploadedFile: UploadedFile[]) => {

    // find the pictures
    if (!uploadedFile) {
        throw new BadRequestError('Must provide an image');
    }

    // check if the pictures are more than 5
    if (uploadedFile.length > 5) {
        fs.rmSync(tmpPath, { recursive: true, force: true });
        throw new BadRequestError('Five images max');
    }


    let url: string[] = [];

    for (const file of uploadedFile) {
        // check if its an image
        if (!file.mimetype.startsWith("image")) {
            fs.rmSync(tmpPath, { recursive: true, force: true });
            throw new BadRequestError('Only images are supported');
        }

        // check if the image is less than 1MB
        const maxSize = 1024 * 1024;
        if (file.size > maxSize) {
            fs.rmSync(tmpPath, { recursive: true, force: true });
            throw new BadRequestError('Image size must be less than 1MB');
        }

        // Upload the image to cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "recipe-sharing-app",
            resource_type: "image",
            format: "webp"
        });

        // push the url
        url = [...url, result.secure_url];
    }

    // remove the tmp folder
    fs.rmSync(tmpPath, { recursive: true, force: true });

    // return the url
    return url;
}

export {
    uploadImage,
    uploadImages
};