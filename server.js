const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

server.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`listen on port ${PORT}...`)
})