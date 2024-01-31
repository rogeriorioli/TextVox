import path from 'node:path';
import multer from 'multer'

const tmpFolder = path.join(__dirname, "../","../", "tmp"); 

const date = new Date();
const isoDate = date.toISOString()


const storage = multer.diskStorage({     
  destination: ( req, file, cb) => {
    cb(null, tmpFolder);
  },
  filename: (req, file, cb) => {
      
      const {id} = req.headers
      
    const filename = file.originalname.replace(/\s+/g, '');

    cb(null, `${isoDate}-${id}-${filename}`);
  }
});''

export const upload = multer({ storage });

