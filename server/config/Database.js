const mongoose = require('mongoose');

const MONGODB_URL = "mongodb://localhost:27017/nodejs-healthycare";
mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected MongoDB")
);
