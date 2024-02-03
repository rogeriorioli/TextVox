import {Router} from 'express'
import AudioController from '../controllers/AudioController';
import { upload } from '../config/upload';
import DocumentController from '../controllers/DocumentController';


export const route = Router();


const audioController = new AudioController();
const documentController = new DocumentController();



route.post('/upload', upload.single('audio'), audioController.UplaodAudio)
route.get('/audio', audioController.getAudio)
route.delete('/audio/:id', audioController.deleteAudio)
route.post('/transcription/audio/:id', documentController.create )
route.get('/transcription/:id', documentController.getDocument )