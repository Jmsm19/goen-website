const Role = use('App/Models/Role');

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

  getRole: async roleName =>
    await Role.query()
      .where('name', roleName)
      .firstOrFail(),
};
