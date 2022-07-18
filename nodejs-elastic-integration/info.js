var client = require('./connection.js');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});

client.count({index: 'cricket_players',type: '_doc'},function(err,resp,status) {  
    console.log("-- Players --",resp);
});
