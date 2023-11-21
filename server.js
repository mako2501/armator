// importuję http
const http = require('http');

//importuję opcje
const app = require('./app');

// wskazuję port
const port = process.env.PORT || 3000;

// tworzę serwer
const server = http.createServer(app);

// odpalam serwer
server.listen(port);
