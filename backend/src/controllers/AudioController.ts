import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export default class AudioController {
  public async UplaodAudio(req: Request, res: Response) {
    const { file } = req;
    try {
      if (!file) {
        res.json("nenhum audio encontrado");
      }
      const audio = await prisma.audio.create({
        data: {
          path: `${file?.path}`,
        },
      });
      res.status(201).json(audio);
    } catch (error) {
      res.status(400).json(error);
    }
    prisma.$disconnect();
  }

  public async getAudio(req: Request, res: Response) {
    try {
      const audios = await prisma.audio.findMany({
        include: {
          document: true,
        },
      });
      res.json(audios);
    } catch (err) {
      res.json(err);
    }
  }
}
