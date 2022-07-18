var client = require('./connection.js');

client.indices.delete({index: 'movies'},function(err,resp,status) {  
  console.log("delete",resp);
});