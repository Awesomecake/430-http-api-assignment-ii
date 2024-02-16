// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  // object for our headers
  // Content-Type for xml
  const headers = { 'Content-Type': 'text/xml' };

  // send response with xml object
  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

const respondPlainText = (request, response, status, object) => {
  // object for our headers
  // Content-Type for xml
  const headers = { 'Content-Type': 'text/plain' };

  // send response with xml object
  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

const success = (request, response, params, acceptedHeaderTypes) => {
  if (acceptedHeaderTypes.includes('text/xml')) {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respondXML(request, response, 200, responseXML);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    const responseJSON = { message: 'This is a successful response' };
    return respondJSON(request, response, 200, responseJSON);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

const badRequest = (request, response, params, acceptedHeaderTypes) => {
  if (acceptedHeaderTypes.includes('text/xml')) {
    if (params.valid === 'true') {
      const responseXML = '<response><message>This request has the required parameters</message></response>';
      return respondXML(request, response, 200, responseXML);
    }

    const responseXML = '<response><message>Missing valid query parameter set to true.</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, responseXML);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    if (params.valid === 'true') {
      const responseJSON = { message: 'This request has the required parameters' };
      return respondJSON(request, response, 200, responseJSON);
    }

    const responseJSON = {
      message: 'Missing valid query parameter set to true.',
      id: 'badRequest',
    };
    return respondJSON(request, response, 400, responseJSON);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

const unauthorized = (request, response, params, acceptedHeaderTypes) => {
  if (acceptedHeaderTypes.includes('text/xml')) {
    if (params.loggedIn === 'yes') {
      const responseXML = '<response><message>You have successfully viewed the content.</message></response>';
      return respondXML(request, response, 200, responseXML);
    }

    const responseXML = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, responseXML);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    if (params.loggedIn === 'yes') {
      const responseJSON = { message: 'You have access to this content' };
      return respondJSON(request, response, 200, responseJSON);
    }

    const responseJSON = {
      message: 'Missing loggedIn query parameter set to yes.',
      id: 'unauthorized',
    };
    return respondJSON(request, response, 401, responseJSON);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

const forbidden = (request, response, params, acceptedHeaderTypes) => {
  if (acceptedHeaderTypes.includes('text/xml')) {
    const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
    return respondXML(request, response, 403, responseXML);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };
    return respondJSON(request, response, 403, responseJSON);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

const internalServerError = (request, response, params, acceptedHeaderTypes) => {
  if (acceptedHeaderTypes.includes('text/xml')) {
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
    return respondXML(request, response, 500, responseXML);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalError',
    };
    return respondJSON(request, response, 500, responseJSON);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

const notImplemented = (request, response, params, acceptedHeaderTypes) => {
  if (acceptedHeaderTypes.includes('text/xml')) {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
    return respondXML(request, response, 501, responseXML);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };
    return respondJSON(request, response, 501, responseJSON);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

const notFound = (request, response, params, acceptedHeaderTypes) => {
  let responseOutput = '';
  if (acceptedHeaderTypes.includes('text/xml')) {
    responseOutput = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    return respondXML(request, response, 404, responseOutput);
  }
  if (acceptedHeaderTypes.includes('text/html') || acceptedHeaderTypes.includes('application/json')) {
    responseOutput = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    return respondJSON(request, response, 404, responseOutput);
  }

  // if no accepted type, return plain text
  return respondPlainText(request, response, 400, 'Invalid media type requested. JSON or XML requests are required.');
};

// set public modules
module.exports = {
  success,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  internalServerError,
  notImplemented,
};
