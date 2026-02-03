const mongoose = require("mongoose");
require("dotenv").config();

const initConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Db connection error", error);
    throw error;
    process.exit(1);
  }
};

const startServer = async (port, server) => {
  await initConnection();
  server.listen(port, () => {
    console.log(`Server up and running on Port ${port}`);
  });
};
module.exports = startServer;
