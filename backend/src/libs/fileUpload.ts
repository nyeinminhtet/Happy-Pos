import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";

// Set S3 endpoint to DigitalOcean Spaces
const s3 = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `happy-pos/jey/${Date.now()}_${ file.originalname}`);
    },
  }),
}).array("files", 1);

export default upload;
