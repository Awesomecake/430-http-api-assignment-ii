const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,

  '/success': dataHandler.success,
  '/badRequest': dataHandler.badRequest,
  '/unauthorized': dataHandler.unauthorized,
  '/forbidden': dataHandler.forbidden,
  '/internal': dataHandler.internalServerError,
  '/notImplemented': dataHandler.notImplemented,
  notFound: dataHandler.notFound,
};

// function to handle requests
const onRequest = (request, response) => {
  // first we have to parse information from the url
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedHeaderTypes = request.headers.accept.split(',');

  // check to see if we have something to handle the request.
  if (urlStruct[parsedUrl.pathname]) {
    return urlStruct[parsedUrl.pathname](request, response, params, acceptedHeaderTypes);
  }

  return urlStruct.notFound(request, response, params, acceptedHeaderTypes);
};

// start server
http.createServer(onRequest).listen(port, () => { console.log(`Listening on 127.0.0.1: ${port}`); });