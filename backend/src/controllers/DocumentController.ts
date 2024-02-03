import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { createReadStream } from "node:fs";
import { openai } from "../config/openai";

export default class DocumentController {
  public async create(req: Request, res: Response) {
    const { id } = req.params;
    const audio = await prisma.audio.findUnique({ where: { id } });
    if (audio) {
      const { path } = audio;
      const audioBuffer = createReadStream(path);
      try {
          const response = await openai.audio.transcriptions.create({
            file: audioBuffer,
            language: "pt",
            response_format: "json",
            model: 'whisper-1',
            temperature : 0,
          });
    
          const transcription = response.text

          const responseTitle = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt : `gerar titulo com base no texto ${transcription}`,
            max_tokens: 25,
            temperature: 0,
            n : 1
          })
          const {choices} = responseTitle;
          const title = choices.map((item) => item.text)
          const parsedTitle = title[0].trim();

          const text = await prisma.document.create({
            data: {
                title : parsedTitle,
                transcription,
                audio_id : id
            }
          })
          res.json(text) 
      }catch(error) {
        const {message} = error
        res.status(400).json({message})
      }
      prisma.$disconnect();  
    }
  }
    public async getDocument(req: Request, res: Response) {
      const {id} = req.params
      try {
        const document = await prisma.document.findFirst({where :  { id } })
        res.status(200).json(document)
      } catch (err) {
        res.status(401).json(err)
      }
    }
  }
