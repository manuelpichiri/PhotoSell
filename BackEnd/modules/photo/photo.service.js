const photoSchema = require("./photo.schema");
const userSchema = require("../user/user.schema");

const getPhotos = async () => {
  const photos = await photoSchema.find();

  return {
    statusCode: 200,
    photos,
  };
};

const getSinglePhoto = async (id) => {
  const photo = await photoSchema.findById(id);
  return {
    statusCode: 200,
    photo,
  };
};

const createPhoto = async (body) => {
  const user = await userSchema.findById(body.user);
  if (!user) {
    throw new Error("User not found0");
  }
  const newPhoto = new photoSchema(body);
  return await newPhoto.save();
};

const deletePhoto = async (id) => {
  const photo = await photoSchema.findByIdAndDelete(id);

  return {
    statusCode: 200,
    photo,
  };
};

const updatePhoto = async (id) => {
  const photo = await photoSchema.findByIdAndUpdate(id);
  return {
    statusCode: 200,
    photo,
  };
};

module.exports = {
  getPhotos,
  getSinglePhoto,
  createPhoto,
  deletePhoto,
  updatePhoto,
};
