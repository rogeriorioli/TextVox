import path from 'node:path';
import multer from 'multer'


const tmpFolder = path.join(__dirname, "../","../", "tmp");


const storage = multer.diskStorage({     
  destination: (req, file, cb) => {
    cb(null, tmpFolder);
  },
  filename: async(req, file, cb) => {
    const isoDate = new Date().toISOString().replace(/:/g, '-').split('.')[0]; // Current timestamp as ISO date
    const filename = file.originalname.replace(/\s+/g, ''); // Remove spaces from the original filename

      cb(null, `${isoDate}-${filename}`);
  }
});


export const upload = multer({ storage });