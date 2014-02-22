var server = require('./server/app')(__dirname);
server.listen(server.get('port'), function() {
  console.log('listening on port', server.get('port'), 'in', server.get('env'));
});
