const express = require('express');
const app = express();
const swagger = express();
const bodyParser = require("body-parser")
let cors = require('cors');
app.use(cors());
const chalk = require('chalk');
const dotenv = require("dotenv");
dotenv.config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('etag');

// SWAGGER Setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MEME STREAM API",
      version: "1.0.0",
      description:
        "A simple Meme API application documented with Swagger",
      contact: {
        name: "Sujal Agrawal",
        email: "sujal2919@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.SWAGGER_URL,
      },
    ],
  },
  schemas: ['http','https'],
  apis: ["app.js"],
};

const specs = swaggerJsDoc(options);

swagger.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// MongoDB connection
const MongoClient = require('mongodb').MongoClient;
let db = "";
MongoClient.connect(process.env.MONG_DB_PASS, { useUnifiedTopology: true })
  .then(client => {
    console.log(chalk.red('Connected to Database'))
    db = client.db('daddymemes')
    
  })
  .catch(error => console.error(error))

// DEFAULT ROUTE
  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: This is the XMEME API
   */

app.get('/',(req,res)=>{

    res.status(200).send("<h1>This is the XMEME API</h1>")
})

// POST ROUTE TO UPLOAD A POST TO DATABASE

/**
   * @swagger
   * /memes:
   *   post:
   *     description: Upload a meme post
   *     
   *     responses:
   *       201:
   *         description: Post uploaded successfully
   *       400:
   *         description: Bad request
   *       409:
   *         description: Duplicate payload request
   */

app.post('/memes', async(req, res) => {
  // console.log(req.body);
  let searchResult = await db.collection("memes").find({
    name : req.body.name,
    caption: req.body.caption,
    url: req.body.url
  }).count()
  console.log("SRCH - ",searchResult);
  if(searchResult){
    res.sendStatus("409");
  }
  else{
  const memesCollection = db.collection('memes')
  memesCollection.insertOne({
    name: req.body.name,
    caption: req.body.caption,
    url: req.body.url
  })
    .then((result) => {
      res.status(200).send({ "id": result.ops[0]._id })
    })
    .catch((err) => res.status(400).send(err))
  }

})


// GET ROUTE TO FETCH ALL MEME POSTS
  app.get('/memes', (req, res) => {
    db.collection('memes').find().sort({_id:-1}).limit(100).toArray()
      .then(results => {
        // console.log(results)
        res.status(200).send(results)
      })
      .catch(err => res.sendStatus(404))
  })  
//Use Routes
// Fetch single post by its id
/** 
* @swagger
* /memes/{id}:
*  get:
*    description: fetch a meme post by it's ID
*  parameters:
*   - in: path
*    name: memeid
*    required: true
*    schema:
*      type: string
*  responses:
*    200:
*      description: gives the id of the meme
*    484:
*      description: Meme not found
*/

app.get('/memes/:id', (req, res) => {
  try {
    let ObjectId = require('mongodb').ObjectId;
    let Meme_id = req.params.id;
    let Object_id = new ObjectId(Meme_id);
    db.collection("memes").find({ _id: Object_id }).toArray()
      .then(result => {
        console.log(result[0]);
        res.status(200).send(result[0]);
      })
      .catch(err => res.sendStatus(404));
  } catch (err) {
    res.sendStatus(404);
  } 
}) 

//Patch 

/** 
* @swagger
* /memes/{id}:
*   patch:
*     description: update caption/url of a post
*     parameters:
*       - name: memeid
*         in: path
*         required: true 
*         type: string
*      requestBody:
*         required: true
*         content:
*           application/json 
*             schema:
*               type: object
*             examples: I
*               potchobj:
*                 value:
*                   caption: MEMES
*                   url: https://picsum.pnoros/280/308.JPG
*       responses
*         204:
*           description: Post undated successfully
*         404:
*           description: Not found 
*         422:
*           description: unprocessable entity
*/
app.patch('/memes/:id', (req, res) => {
  try {
    let updateObject = req.body;  // get params to update(caption,url)
    // Check if request body has 'name' property
    if (updateObject.hasOwnProperty("name")) {
      res.send({ "Error": "Author name cannot be changed" });
    }
    else {
      let ObjectId = require('mongodb').ObjectId;
      let meme_id = req.params.id; // get meme id
      let object_id = new ObjectId(meme_id);
      db.collection("memes").updateOne({ _id: object_id }, { $set: updateObject })
        .then(result => {
          // console.log(result);
          res.sendStatus(200);
        })
        .catch(err => res.send("404 Not Found"));
    }
  }
  catch (err) {
    res.sendStatus(404);
  }
})

module.exports = app
module.exports.swagger = swagger
