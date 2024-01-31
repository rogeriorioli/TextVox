import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
      title: 'Título do audio',
      transcription: `Seu papel é gerar três títulos para o conteudo do audio.

Abaixo você receberá uma transcrição desse audio, use essa transcrição para gerar os títulos.
Abaixo você também receberá uma lista de títulos, use essa lista como referência para os títulos a serem gerados.

Os títulos devem ter no máximo 60 caracteres.
Os títulos devem ser chamativos e atrativos para maximizar os cliques.

Retorne APENAS os três títulos em formato de lista como no exemplo abaixo:
'''
- Título 1
- Título 2
- Título 3
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Transcrição do audio',
      transcription: `Seu papel é gerar o texto do audio em formato markdown.
  
conventer esse audio em texto no formato markdown 


Além disso, no final da conversão inclua uma lista de 3 até 10 hashtags em letra minúscula contendo palavras-chave do audio.

O retorno deve seguir o seguinte formato:
'''
## data de criação.

Texto do audio.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })