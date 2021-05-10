const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Image = require('../database/imageSchema.js');
const User = require('../database/userSchema.js');

// Gets all the images from the repository to be displayed on home page
function getImages(dirPath) {
  let images = [];
  const files = fs.readdirSync(dirPath);
  //process each image and add it to the array to be returned
  for (file of files) {
    const location = path.join(dirPath, file);
    const stat = fs.statSync(location);
    if (stat && stat.isDirectory()) {
      getImages(location);
    } else if (stat && stat.isFile() && ['.jpg', 'png'].indexOf(path.extname(location)) != -1) {
      images.push('static/' + file);
    }
  }
  return images;
}

exports.home = function(req, res){
  let images = getImages('./public/images');
  // res.render('home', {images: images, loggedIn: false});
  res.render('home', {images: images}); //passing the array object containing all the images
}

exports.about = function(req, res) {
  res.render('about');
}

exports.login = function(req, res) {
  res.render('login', {invalid: false});
}

// processes the user input and validates user for logging in
exports.userLogin = function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // compares user with database for validation
  find('userDB', {username: username, password: password}, function(err, foundUser){
    if (err) {
      console.log(err);
    }
    // redirect user to home page once validated otherwise display error image
    if (foundUser.length != 1) {
      res.render('login', {invalid: true});
    } else {
      console.log("Successful login");
      let images = getImages('./public/images');
      // res.render('home', {images: images, loggedIn: true});
      res.render('home', {images: images});
    }
  })
  //helper function to find user from database
  function find (name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
   });
  }
}

exports.upload = function(req, res) {
  res.render('upload', {msg: '', success: null});
}

// processes images uploaded by user and add them to database as well as local repository /public/images
exports.uploads = function(req, res, next) {
  const files = req.files;

  // map the uploaded images to database and return the array of Promises
  let result = files.map((elem, index) => {
    let encoded_img = elem.buffer.toString('base64'); //encodes image to base64 before adding object to db

    // create collection object for database storage
    const image = new Image({
      filename: files[index].originalname,
      contentType: files[index].mimetype, //specifies the media image type
      imageBase64: encoded_img
    });
    // saves the valid images from files to database
    return image
        .save()
        .catch(error => {
          if (error) {
            //database realted error handling, duplicate image uploading
            if (error.name === 'MongoError' && error.code === 11000) {
              return Promise.reject({error: `Duplicate: ${files[index].originalname}. File already exists!`});
            }
            return Promise.reject({error: error.message || `Unable to upload ${files[index].originalname}.`})
          }
        })
        .then(() => { // once successfull, add the image with unique identifier to the local repository
          let prefix = path.parse(files[index].originalname).name;
          let extension = path.parse(files[index].originalname).ext;
          let uniqueName = prefix + '-' + Date.now() + extension;

          fs.writeFile('public/images/' + uniqueName, elem.buffer, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          return {msg: `${files[index].originalname} uploaded successfully!`}
        })
  });

  //from the returned promises return success/error message to be displayed 
  Promise.all(result)
        .then(msg => {
          // res.json(msg);
          res.render("upload", {msg: msg, success: true});
        })
        .catch(error => {
          // res.json(error);
          res.render("upload", {msg: error, success: false});

        })
  // res.json(files);
}
