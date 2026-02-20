const express = require("express");
const photo = express.Router();
const photoController = require("./photo.controller");

photo.get("/photos", photoController.findAllPhotos);
photo.get("/photo/:id", photoController.findPhotoById);
photo.get("/photos/:id", photoController.findPhotoByUserId);
photo.get("/photos/title/:title", photoController.findPhotoByTitle);

photo.post("/photo", photoController.createPhoto);

photo.delete("/photo/:id", photoController.deleteById);

photo.patch("/photo/:id", photoController.updatePhoto);

module.exports = photo;
