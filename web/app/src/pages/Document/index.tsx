import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { Document } from '../../types';
import {ArrowUturnLeftIcon} from '@heroicons/react/24/solid'

export default function DocumentPage() {
  const navigate= useNavigate()
  const { id } = useParams()
  const [doc, setDoc] = useState<Document>()

  const getDocument = async () => {
    try {
      const {data} = await api.get<Document>(`/transcription/${id}`)
      setDoc(data)
    }catch(err) {

    }
  }

  useEffect(() => {
    getDocument()
  },[])
  return (
    <article className='lg:w-96 bg-white p-8 mx-auto'>
      <div>
        <button onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon className="h-6 w-6 text-gray-900"/>
        </button>
      </div>
       <small className='text-gray-400'>{new Date(`${doc?.created_at}`).toLocaleDateString('pt')}</small> 
      <h2 className=' font-medium  text-gray-900 mt-3'>{doc?.title}</h2>
      <p className='text-xs text-gray-800 my-3'>{doc?.transcription}</p>
      <footer>
        <small className='text-gray-400'>document generated from audio id : {doc?.audio_id}</small>
      </footer>
    </article>
  )
}
