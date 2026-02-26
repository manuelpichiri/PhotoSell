import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../src/config/api";
export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);

  const getAllPhotoByUserId = async (id) => {
    try {
      const response = await fetch(`${API_URL}/photos/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserPhoto(data.photos.photos);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePhoto = async (id, token) => {
    try {
      if (!token) {
        toast.error("token not found");
        return;
      }
      const response = await fetch(`${API_URL}/photo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserPhoto((prev) => prev.filter((photo) => photo._id !== id)); //prev prende quello che c'è nell'array e lo riutilizza per creare uno nuovo
      setPhotos((prev) => prev.filter((photo) => photo._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllPhoto = async () => {
    try {
      const response = await fetch(`${API_URL}/photos`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setPhotos(data.photos.photos);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllPhoto();
  }, []);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        setPhotos,
        getAllPhotoByUserId,
        userPhoto,
        deletePhoto,
        setUserPhoto,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
