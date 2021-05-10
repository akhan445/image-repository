# image-repository

This is a project developed for the shopify intern challenege. The project is an online image repository and currently supports image uploads (1 to many) securely.

## Tech Stack

- Node.js with Express framework for backend
- MongoDB for Database with Mongoose for Object modeling
- BootStrap v5 for front end framework

## Project Structure

The project was designed with modularity and SOLID principles in mind to make code more readable and easier to modify/expand as needed. I tried to seperate the code based on functionality and tried to build it using the MVC design pattern.

The Collection that stores images is called 'images'. Each object is stored as a json object. To make each filename unique we use the Date.now() as a suffix to filename stored in the local repository in [images](./public/images). Here is a sample json object:
        
    {
        "_id": {
            "$oid": "6098c0d9bf572652bb712c28"
         },
         "filename": "beach.jpg",
         "contentType": "image/jpeg",
         "imageBase64": "/9j/4AAQSkZJRgABAyecKaKp49pqeFhUY.......C9tBp5IVYLLWssSy08QW1n/9k=",
         "__v": {
           "$numberInt": "0"
         }
    }
      
The site also has a functioning user authentication. However it is not fully integrated into the site yet. You can login using the registered users and it works correctly however it still needs to be synced with the website so the site will have limited access to its features like uploading images.

Use the following user information to access and test the login feature:

        username: john@email.com
        password: john123
        
        username: jane@email.com
        password: jane123

# How To Run

Assuming you have MongoDB and Node already installed on your local machine. To run locally:

1. Use the cd command to location of the repository
   ```
   cd /pathToLocalRepository
   ```
2. Then run the following node commands.
   - Initialize npm
      ```
      npm init
      ```
   - Install all dependencies
      ```
      npm install
      ```
    - Run the project
      ```
      npm start
      ```
You do not need to configure anything for the database as I've included the link for it in the [database.js](./database/database.js) and is already hosted on the MongoDB server. If you wish to change it you will have to change the link and then you can run it locally.

# Features
The project's main focus was for users to be able to upload image(s) to the site successfully.

## Current
- **Uploading Images:**
    - Users can upload images securely to the website.
    - They have the option of 1 (minimum) to as many as they would like. User can only upload image types and will not be able to upload any other file types. In addition, users cannot upload duplicate images and will be prompted with an error message.
    - Once image(s) are verified, they will be added to the database and local repository.
- **Beautiful looking display for images on the home page:**
    - The Home page will display the images in a masonry grid layout.
      *NOTE: If the masonry layout is not working well on load, please refresh and try again. This is a bootstrap issue and not related to my code.*
- **User Authenticaion (Level 1) (Still under developement)**
    - Valid users can login and will be validated. The idea is that in order to upload images you must be registered with the website.
    - Only registered users can access the image upload page and will be redirected unless they are authenticated.

## Future Iterations
- **Add delete functionality**
- **Image Search**
    - tag-based searching
    - characterisitc based searching
    - reverse image search
