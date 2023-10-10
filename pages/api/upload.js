import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import streamifier from "streamifier";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");
cloudinary.config({
  cloud_name: "dvqwpk7cc",
  api_key: "976243175956364",
  api_secret: "zHzVGpOxciHBTbtPemVdH6oVYac",
  secure: true,
});
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
export default async function handler(req, res) {
  await runMiddleware(req, res, uploadMiddleware);

  console.log("🛺 ~ file: upload.js:28 ~ handler ~ req.file:", req.body);
  const stream = await cloudinary.uploader.upload_stream(
    {
      folder: "demo",
    },
    (error, result) => {
      if (error) return console.error(error);
      res.status(200).json(result);
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
}
export const config = {
  api: {
    bodyParser: false,
  },
};
