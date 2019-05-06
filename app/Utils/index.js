const Role = use('App/Models/Role');
const Clan = use('App/Models/Clan');

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

  getClan: async roleName =>
    await Clan.query()
      .where('name', roleName)
      .firstOrFail(),

  /**
    Converts a string from camelCase to snake_case

    @param {String} camelCaseString
    @return {String} snake_case_string
  */
  camelCaseToSnakeCase: camelCaseString =>
    camelCaseString.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase(),
};
