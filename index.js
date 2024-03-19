const http = require('node:http');

const handleRequest = (request, response, body) => {
  switch (request.method) {
    case 'GET':
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          message: 'All books successfully retrieved',
        })
      );
      break;
    case 'POST':
      if (body) {
        const data = JSON.parse(body);
        const book = {
          id: 1,
          ...data,
        };
        return response.end(
          JSON.stringify({
            method: `${request.method}`,
            book,
          })
        );
      }
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          message: 'No body data',
        })
      );
      break;
    case 'PUT':
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          message: 'This endpoint works',
        })
      );
      break;
    case 'DELETE':
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          message: 'Delete endpoint working',
        })
      );
      break;
    default:
      response.statusCode = 405;
      response.end(
        JSON.stringify({
          error: 'Method not allowed',
        })
      );
  }
};

const requestHandler = (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    switch (request.url) {
      case '/books':
        handleRequest(request, response, body);
        break;

      case '/books/author':
        handleRequest(request, response, body);
        break;

      default:
        response.statusCode = 404;
        response.end(
          JSON.stringify({
            error: 'Not found',
          })
        );
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
