"use client";

import { storage } from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (file) {
      const storageRef = ref(storage, `/ProductsImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observar eventos de mudança de estado, como progresso, pausa e retomada
          // Obter o progresso da tarefa, incluindo bytes transferidos e o total de bytes a serem transferidos
          const progress: number =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Tratar falhas no upload
          console.error("Upload failed:", error);
        },
        () => {
          // Tratar upload bem-sucedido na conclusão
          // Por exemplo, obter a URL de download:
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              console.log("File available at", downloadURL);
            }
          );
        }
      );
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFile(file);
          }
        }}
      />
      <button onClick={uploadFile}>Enviar</button>
    </div>
  );
};

export default Upload;
