import { createContext, useEffect, useState } from "react";

export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);

  const getAllPhotoByUserId = async (id) => {
    try {
      const response = await fetch(`http://localhost:4545/photos/${id}`, {
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

  const getAllPhoto = async () => {
    try {
      const response = await fetch("http://localhost:4545/photos", {
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
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
