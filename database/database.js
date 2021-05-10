const mongoose = require('mongoose');

// database connection
const connect = mongoose.connect("mongodb+srv://imagerepo-admin:admin1234@imagerepocluster.cjtfl.mongodb.net/imagerepoDB?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

module.exports = connect;
