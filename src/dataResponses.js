const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const addUser = (request, response, params) => {
  // default json message
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // check for name and age
  if (!params.name || !params.age) {
    responseJSON.id = 'addUserMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[params.name]) {
    responseCode = 204;
  } else {
    users[params.name] = {};
  }

  users[params.name].name = params.name;
  users[params.name].age = params.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSON(request, response, responseCode, responseJSON);
};

const getUsers = (request, response) => {
  if (request.method === 'GET') {
    const responseJSON = { users };
    return respondJSON(request, response, 200, responseJSON);
  }
  return respondJSONMeta(request, response, 200);
};

const notFound = (request, response) => {
  const responseOutput = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseOutput);
};

// set public modules
module.exports = {
  getUsers,
  addUser,
  notFound,
};
