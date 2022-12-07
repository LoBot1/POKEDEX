const express = require("express");
const dbo = require("./db/db");
const bodyParser = require('body-parser');
const { ObjectId, ObjectID } = require("mongodb");
const app = express();
const port = 4444;

dbo.connectToServer();

/*
suite du code ici
*/
/* index.js code before... */
app.get("/pokemonCatch/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemonCatch")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
    /*
    Bref lisez la doc, 
    il y a plein de manières de faire ce qu'on veut :) 
    */
    
});



app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

// app.post('/pokemonCatch/insert', jsonParser, (req, res) => {
//   const body = req.body;
//   console.log('Got body:', body);
//   const dbConnect = dbo.getDb();
//   dbConnect
//     .collection("pokemonCatch")
//     .insertOne({...body})
//     .then(function (result, error){
//       if(error) {
//         res.json({error : error.message})
//       }
//       res.json({result})
//     });
// });
//recuperer un pokemon grace a l'id 

app.post('/pokemonCatch/insert', jsonParser, (req, res) => {
  const body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("pokemonAll")
  // trouver 1 pokemon grace a l'id dans "pokemon"" 
  .findOne({_id: ObjectId(body._id)})
  //inserer le pokemon a pokemonCapture
  .then(function (pokemon, error){
    if(error) {
        res.json({error : error.message})
    }
    // insert 
    else{
      dbConnect
      .collection("pokemonCatch")
      .insertOne(pokemon, { forceServerObjectId: false })
      console.log("Post Updated successfully");}
    res.json({pokemon})
  });
});

app.use('/pokemonCatch/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemonCatch")
    .deleteOne({...body})
    .then(function (result, error){
      if(error) {
        res.json({error : error.message})
      }
      res.json({result})
    });
});

// app.post('/pokemonCatch/update', jsonParser, (req, res) => {
//   const body = req.body;
//   console.log('Got body:', body);
//   const dbConnect = dbo.getDb();
//   dbConnect
//     .collection("pokemonCatch")
//     .updateOne({...body})
//     .then(function (result, error){
//       if(error) {
//         res.json({error : error.message})
//       }
//       res.json({result})
//     });
// });

// app.post('/pokemonCatch/update', jsonParser, (req, res) => {
//   const body = req.body;
//   const dbConnect = dbo.getDb(); 
//   filter = {name: body.pokemonCatch}
//   set = {$set:{name:body.name}}
//   dbConnect.collection("pokemonCatch").updateOne(filter,set);
//   res.json(body);
// });

app.post('/pokemonCatch/update',jsonParser,(req, res) => {
  console.log(req.body);
  console.log(); 
  const dbConnect = dbo.getDb(); 
  dbConnect.collection('pokemonCatch').updateMany(
    { _id: ObjectId(req.body._id) }, 
    { $set: {name: req.body.name,type1:req.body.type1,type2:req.body.type2,desc:req.body.desc,num:req.body.num}
  }, function(err, result) {
       if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        console.log("Post Updated successfully");
        res.json(result);
    } 
 });
});

// le pokedex
 
app.use('/pokemonAll/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemonAll")
    .deleteOne({...body})
    .then(function (result, error){
      if(error) {
        res.json({error : error.message})
      }
      res.json({result})
    });
});


app.post('/pokemonAll/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemonAll")
    .insertOne({...body})
    .then(function (result, error){
      if(error) {
        res.json({error : error.message})
      }
      res.json({result})
    });
});

app.get("/pokemonAll/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemonAll")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  });

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


