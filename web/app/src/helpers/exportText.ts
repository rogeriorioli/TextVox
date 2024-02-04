import { saveAs } from "file-saver";


export const exportFile = (text : string , title: string) => {
  
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${title}.txt`);
  }