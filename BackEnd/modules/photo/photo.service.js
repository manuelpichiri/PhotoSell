const photoSchema = require("./photo.schema");
const userSchema = require("../user/user.schema");

const getPhotos = async () => {
  const photos = await photoSchema
    .find()
    .populate("user", "firstName lastName");
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
    throw new Error("User not found");
  }
  const newPhoto = new photoSchema(body);
  const savedPhoto = await newPhoto.save();

  await userSchema.findByIdAndUpdate(
    body.user,
    { $push: { photo: savedPhoto._id } },
    { new: true },
  );
  return savedPhoto;
};

const deletePhoto = async (id) => {
  const photo = await photoSchema.findByIdAndDelete(id);

  return {
    statusCode: 200,
    photo,
  };
};

const updatePhoto = async (id, body) => {
  const photo = await photoSchema.findByIdAndUpdate(id, body, { new: true });
  return {
    statusCode: 200,
    photo,
  };
};

const findPhotoByTitle = async (title) => {
  const verificationTitle = title?.trim();

  if (!verificationTitle) {
    return [];
  }

  const photos = await photoSchema
    .find({ title: { $regex: title, $options: "i" } })
    .populate("user", "firstName lastName");

  return photos; //<--- in questo modo non mi ritorna un'oggetto annidato e non sono costretto a fare photo.photo
};

const findPhotoByUserId = async (id) => {
  const photos = await photoSchema
    .find({ user: id })
    .populate("user", "firstName lastName");
  return {
    photos,
  };
};
module.exports = {
  getPhotos,
  getSinglePhoto,
  createPhoto,
  deletePhoto,
  updatePhoto,
  findPhotoByUserId,
  findPhotoByTitle,
};
