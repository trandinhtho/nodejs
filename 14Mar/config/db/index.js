const MONGO_URL = "mongodb://127.0.0.1:27017/webbanghang";

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });


module.exports = { connect };