const photoService = require("./photo.service");

const findAllPhotos = async (req, res) => {
  try {
    const photos = await photoService.getPhotos();
    if (photos.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No photo found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      photos,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request findAllPhotos",
    });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { body } = req;
    const photo = await photoService.createPhoto(body);
    res.status(200).send({
      statusCode: 200,
      photo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      statusCode: 500,
      message: "an error during the request createPhoto",
    });
  }
};

const findPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await photoService.getSinglePhoto(id);
    res.status(200).send({
      statusCode: 200,
      photo,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request findPhotoByID",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await photoService.deletePhoto(id);
    res.status(200).send({
      statusCode: 200,
      photo,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request deleteById",
    });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const photo = await photoService.updatePhoto(id, body);
    res.status(200).send({
      statusCode: 200,
      photo,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request updatePhoto",
    });
  }
};

const findPhotoByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const photos = await photoService.findPhotoByUserId(id);
    res.status(200).send({
      statusCode: 200,
      photos,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request findPhotoByUserId",
    });
  }
};

const findPhotoByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const photos = await photoService.findPhotoByTitle(title);
    if (photos.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No photos found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      photos,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "an error during the request findPhotoByTitle",
    });
  }
};

module.exports = {
  updatePhoto,
  deleteById,
  findAllPhotos,
  findPhotoById,
  createPhoto,
  findPhotoByUserId,
  findPhotoByTitle,
};
