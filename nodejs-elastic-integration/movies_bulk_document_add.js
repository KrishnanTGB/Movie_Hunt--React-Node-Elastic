var client = require('./connection.js');
var inputfile = require("./movies.json");
var bulk = [];

var makebulk = function(movieslist, callback){
  for (var current in movieslist){
    bulk.push(
      { index: {_index: 'movies', _type: '_doc', _id: movieslist[current].id } },
      {
        'name': movieslist[current].name,
        'category': movieslist[current].categories,
        'description': movieslist[current].description
      }
    );
  }
  callback(bulk);
}

var indexall = function(madebulk, callback) {
  client.bulk({
    maxRetries: 5,
    index: 'movies',
    type: '_doc',
    body: madebulk
  },function(err, resp, status) {
      if (err) {
        console.log(err);
      }
      else {
        callback(resp.items);
      }
  })
}

makebulk(inputfile, function(response){
  console.log("Bulk content prepared");
  indexall(response, function(response){
    console.log(response);
  })
});