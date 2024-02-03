import React, { InputHTMLAttributes } from 'react';



interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const FileUploadComponent = ({...props} :Props) => {
  return (
    <div className="bg-gray-50 text-center px-4 rounded  lg:w-96 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-sans">
      <div className="py-6">
        <input type="file" name="" id="uploadFile1" className="hidden" {...props} />
        <label htmlFor="uploadFile1" className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100">
          Browse Files
        </label>
        <p className="text-xs text-gray-400 mt-4">'flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm' are Allowed.</p>
      </div>
    </div>
  );
};  

export default FileUploadComponent;