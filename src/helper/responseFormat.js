function success(h, { message, data }, code = 200) {
  const body = {
    status: 'success',
  };

  if (message) {
    body.message = message;
  }

  if (data) {
    body.data = data;
  }

  return h.response(body).code(code);
}

function failed(h, message, code = 400) {
  return h.response({
    status: 'fail',
    message,
  }).code(code);
}

module.exports = { success, failed };
