const photoSchema = require("./photo.schema");
const userSchema = require("../user/user.schema");
const getPhotos = async () => {
  const photos = photoSchema.find();

  return {
    statusCode: 200,
    photos,
  };
};

const getSinglePhoto = async (id) => {
  const photo = photoSchema.findById(id);
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
  const newPhoto = new photoSchema({
    body,
  });
};

module.exports = {
  getPhotos,
};
