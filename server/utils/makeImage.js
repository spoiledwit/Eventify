import nodeHtmlToImage from 'node-html-to-image';
import path from 'path';
import template from './template.js';
import imgbbUploader from 'imgbb-uploader';
import dotenv from 'dotenv';
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function makeImage(data) {
    const imagePath = path.join(__dirname, "..", "posts", `image.jpg`)

    await nodeHtmlToImage({
        output: imagePath,
        type: 'jpeg',
        height: 1500,
        width: 1500,
        quality: 100,
        html: template(data)
    })

    const API_KEY = process.env.IMGBB_API_KEY;

    const url = await imgbbUploader(API_KEY, imagePath)
    .then((response) => {
        return response.url;
    })
    .catch((error) => console.error(error));

    return url;
}

export default makeImage;