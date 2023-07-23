import "./config/config.js";
import express from "express";
import "./models/index.js";
import cors from "cors";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";
import multer from "multer";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/UserModel.js";
import { authentication } from "./auth.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// authentication endpoint
app.get("/api/auth-endpoint", authentication, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

// register endpoint
app.post("/api/register", (request, response) => {
  console.log(request);
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/api/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// free endpoint
app.get("/api/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/api/auth-endpoint", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

//# Fetche alle Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//# Fetche alle Authoren
app.get("/api/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
    console.log(authors);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// # Fetche einen Post mit der ID
app.get("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
    console.log(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// # Fetche alle Posts eines Authors mit der ID des Authors
app.get("/api/getPostsByAuthor/:authorId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.authorId });
    res.send(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// # Poste einen neuen Post
app.post("/api/addPost", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    const author = await Author.findById(req.body.author);
    if (author === null) {
      return res.send("Author is invalid");
    }

    // Überprüfen, ob das Bild erfolgreich hochgeladen wurde
    if (!req.file) {
      return res.status(400).send("No image file found.");
    }

    // Cloudinary-Upload-Stream-Ereignis mit Fehlerbehandlung
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "MyBlog" },
        async (err, result) => {
          if (err) {
            console.log("Cloudinary upload error:", err);
            return res.status(500).send("Error uploading image to Cloudinary.");
          }

          console.log("Cloudinary upload result:", result);
          try {
            const response = await Post.create({
              ...req.body,
              image: { url: result.secure_url, imageId: result.public_id },
            });
            res.json(response);
          } catch (err) {
            console.log("Error creating post:", err);
            res.status(500).send("Error creating post.");
          }
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("There was an error.");
  }
});

// # Poste einen neuen Author
app.post("/api/newAuthor", async (req, res) => {
  try {
    const response = await Author.create(req.body);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Update einen Post mit der ID
app.put("/api/updatePost/:id", async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(req.params.id, req.body).then(
      (response) => {
        res.json(response);
        console.log(response);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Update einen Author mit der ID
app.put("/api/updateAuthor/:id", async (req, res) => {
  try {
    const response = await Author.findByIdAndUpdate(req.params.id, req.body);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Lösche einen Post mit der ID
app.delete("/api/deletePost/:id", async (req, res) => {
  try {
    const response = await Post.findByIdAndDelete(req.params.id);
    cloudinary.uploader.destroy(response.image?.imageId, (err) => {
      console.log(err);
    });
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Lösche einen Author mit der ID
app.delete("/api/deleteAuthor/:id", async (req, res) => {
  try {
    const response = await Author.findByIdAndDelete(req.params.id);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Startet den Server mit dem jeweiligen PORT
app.listen(PORT, () => {
  console.log("Server läuft auf Port: " + PORT);
});
