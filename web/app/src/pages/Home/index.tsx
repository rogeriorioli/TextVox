import React, { useEffect, useState } from "react";
import FileUploadComponent from "../../components/FileUpload";
import List from "../../components/List";
import { api } from "../../api/api";
import Toast from "../../components/Toast";
import Logo from "../../components/Logo";
import Loader from "../../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [toast, setToast] = useState({
    open:false,
    message : '',
    response: ''
  });
  const getData = async () => {
    try {
      const { data } = await api.get("/audio");
      if (data) {
        setItems(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const options = {
      audio: file,
    };

    try {
      const response = await api.post("/upload", options, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setToast({
        open : true,
        message : 'upload successful',
        response : 'success'
      })
      await getData();

    } catch (error) {
      setToast({
        open : true,
        message : 'file format not Allowed',
        response : 'error'
      })
  
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/audio/${id}`);
      const newList = items.filter((item) => item.id !== id);
      setItems(newList);
      setToast({
        open : true,
        message : 'deleted successful',
        response : 'success'
      })
    } catch (err) {}
  };

  const handleCreate = async (id: string) => {
    setLoading(true)
    try {
      const response = await api.post(`/transcription/audio/${id}`);
      console.log(response.data)
      setToast({
        open : true,
        message : 'audio trasncription successful',
        response : 'success'
      })
      setLoading(false)
      getData();
    } catch (err) {}
  };
  const closeToast = () => {
    setToast({
      open : false,
      message : '',
      response : ''
    })
  };

  return (
      <>
          <FileUploadComponent onChange={handleSubmit} />
          <div className=" overflow-auto h-96 lg:w-96 mx-auto mt-4 px-2">
            {items.map((item) => (
              <List
                key={item.id}
                id={item.id}
                created_at={new Date(item.created_at).toLocaleDateString("pt")}
                name={item.name}
                bump={() => handleDelete(item.id)}
                create={() => handleCreate(item.id)}
                document={item.document}
              />
            ))}
          {loading && <Loader/>}
          </div>
      {toast.open && <Toast response={toast.response} text={toast.message} close={closeToast} />}
    </>
  );
}
