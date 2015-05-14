
# WTF?
# I can't run `ponte` from the command line (address in use error)
# I can't: `var ponte = require('ponte'); # module not found
# so I have to hard-code the full path, seriously!?
var ponte = require('/usr/local/lib/node_modules/ponte');

var opts = {
  logger: {
    level: 'info'
  },
  http: {
    port: 3000 // tcp 
  },
  mqtt: {
    port: 3001 // tcp 
  },
  coap: {
    port: 3000 // udp 
  },
  persistence: {
    type: 'level',
    path: './db'
  }
};
var server = ponte(opts);
 
server.on("updated", function(resource, buffer) {
  console.log("Resource Updated", resource, buffer);
});
