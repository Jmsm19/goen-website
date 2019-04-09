module.exports = {
  /**
    Returns an 404 error response with message

    @param {Object} response
    @param {String} message
    @return {*} 404 response
  */
  sendErrorResponse: (response, message) =>
    response.status(404).json({
      error: message,
    }),
};
