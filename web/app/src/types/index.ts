export type Document = {
    id: string;
    title: string;
    created_at?: string;
    audio_id?: string;
    s3Url? : string
    transcription? : string
  };