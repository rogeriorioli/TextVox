import React, { useState } from "react";
import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {Document } from '../types'


interface ListProps {
  id: string;
  name: string;
  created_at?: string;
  create: () => void;
  bump: () => void;
  document?: Document[];
}

export default function List({
  id,
  name,
  created_at,
  document,
  create,
  bump,
}: ListProps) {
  return (
    <div className="bg-white flex  flex-col rounded-lg my-2 p-4 mx-auto gap-2">
      <small className="text-slate-400">{created_at}</small>
      <div className="flex justify-center">
        <div className=" text-slate-800 mr-2 w-4/5 text-sm">{name}</div>
        <div className="flex self-end w-1/5 items-end justify-end">
          {document?.length === 0 && (
          <button onClick={create}>
            <DocumentPlusIcon
              className="h-6 w-6 text-green-500"
              title="create document"
            />
          </button>)
        }
          <button onClick={bump}>
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>
      <hr />
      {document?.length ? <h2>Document generated</h2> : 'No docs found'}
      {document && (
        document.map((doc) => (
          <div key={doc.id}>
            <small className="text-slate-400">{new Date(`${doc.created_at}`).toLocaleDateString("pt")}</small>
            <div className=" text-slate-800 mr-2 w-4/5 text-sm">
            <a href={`document/${doc.id}`} title="read document">{doc.title}</a>
            </div>
          </div>
        )))}
    </div>
  );
}
