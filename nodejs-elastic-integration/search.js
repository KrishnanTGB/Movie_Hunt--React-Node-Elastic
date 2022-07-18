const client = require('./connection.js');
const express = require('express');
const uiApp = express();
const bodyParser = require('body-parser').json();
const cors = require("cors");

uiApp.use(cors());

//GET - Search the documents
uiApp.get("/search", (req, res) => {
  let query = {
    index: 'movies',
    type: '_doc'
  }
  if(req.query.movie) 
    query.q = `*${req.query.movie}*`;
  client.search(query)
  .then(resp=>{
      return res.status(200).json({
          movies: resp.hits.hits
      });
  })
  .catch(err=>{
      console.log(err);
      return res.status(500).json({
          msg: 'Movie fetching without id - Error',
          err
      });
  });
});

//POST - Create a document
uiApp.post("/create/:id", bodyParser, (req, res) => {
  // console.log(req.body);
  client.index({
    index: 'movies',
    type: '_doc',
    id: req.params.id,
    body: req.body
  })
  .then(resp=>{
      return res.status(200).json({
          msg: 'Movie indexed'
      });
  })
  .catch(err=>{
      return res.status(500).json({
          msg: 'Movie indexing - Error',
          err
      });
  })
});

//PUT - Updates a specific document
uiApp.put('/update/:id', bodyParser, (req, res)=>{
  client.update({
      index: 'movies',
      id: req.params.id,
      body: {
          doc: req.body
      }
  })
  .then(resp=>{
      return res.status(200).json({
          msg: 'Movie updated'
      });
  })
  .catch(err=>{
      console.log(err)
      return res.status(500).json({
          msg: 'Movie updation - Error',
          err
      });
  })
});

//GET - Delete a specific document
uiApp.get('/delete/:id', (req, res)=>{
  client.delete({
      index: 'movies',
      id: req.params.id
  })
  .then(resp=>{
      res.status(200).json({
          msg: 'Movie deleted!!'
      });
  })
  .catch(err=>{
      res.status(404).json({
          msg: 'Movie deletion - Error',
          err
      });
  });
});

//GET - Read a specific document
uiApp.get('/view/:id', (req, res)=>{
  let query = {
      index: 'movies',
      id: req.params.id
  }
  client.get(query)
  .then(resp=>{
      if(!resp){
          return res.status(404).json({
              movie: resp
          });
      }
      return res.status(200).json({
          movie: resp
      });
  })
  .catch(err=>{
      return res.status(500).json({
          msg: 'Movie getting - Error',
          err
      });
  })
});


uiApp.listen(3000, () => {
  console.log("webserver is running on 3000..");
});