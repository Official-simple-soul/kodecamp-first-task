const http = require('http');
const fs = require('fs');

// Middleware function to log incoming requests to the console
const logRequest = (req) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
};

const server = http.createServer((req, res) => {
  // Call the logRequest middleware to log the incoming request
  logRequest(req);

  if (req.url === '/file') {
    // Read the content of the "data.txt" file
    fs.readFile('data.txt', 'utf8', (err, data) => {
      if (err) {
        // If there's an error reading the file, respond with a 500 internal server error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        // Respond with the content of the file
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (req.url === '/api/user') {
    // Sample user object
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    };

    // Respond with the user object as JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    // For all other routes, respond with "Hello, Node.js!"
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js!');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
