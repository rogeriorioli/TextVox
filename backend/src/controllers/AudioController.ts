import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import path from "path";

export default class AudioController {
  public async UplaodAudio(req: Request, res: Response) {
    const { file } : any  = req;


    if (!file) {
      res.json("nenhum audio encontrado");
    }
    if (file.mimetype.startsWith('audio/')) {
    try {
      const audio = await prisma.audio.create({
        data: { 
          name : `${file.filename}`,
          path: `${file?.path}`,
        },
      }); 
      res.status(201).json(audio);
      
    } catch (error) {
      res.status(400).json(error);
    }
    prisma.$disconnect();
  }else {
    res.status(401).json("file format not allowed")
  }
}


  public async getAudio(req: Request, res: Response) {
    try {
      const audios = await prisma.audio.findMany({
        include: {
          document: true,
        },
        orderBy: {
          created_at : 'desc'  
        }
      });
      res.json(audios);
    } catch (err) {
      res.json(err);
    }
  }

  public async deleteAudio(req: Request, res: Response) {
    const {id} = req.params
    try {
      const audio = await prisma.audio.delete( { where : { id}})
      res.json(audio);
    } catch (err) {
      res.json(err);
    }
  }

  public async playAudio(req: Request, res: Response) {
    const {file} = req.params
    console.log(file)
    const tmpFolder = path.join(__dirname, "../","../", "tmp/")
    try {
      res.sendFile(tmpFolder+file);
    } catch (err) {
      res.json(err);
    }
  }
  
}
