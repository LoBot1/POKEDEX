const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;

dbo.connectToServer();

/*
suite du code ici
*/
/* index.js code before... */
app.get("/pokemonname/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemonname/name")
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

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();
app.post('/pokemonname/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemonname")
    .insert({name: req.body.name})
  res.json(req.body.name)
  //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
      
  res.json(body);
});