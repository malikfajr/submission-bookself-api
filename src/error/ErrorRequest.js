class ErrorRequest extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

module.exports = ErrorRequest;
