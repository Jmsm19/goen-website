/** @type {typeof import('adonis-bumblebee/src/Bumblebee')} */
const Bumblebee = use('Adonis/Addons/Bumblebee');

module.exports = {
  getTransformedResponse: async (data, transformer, isCollection = false, includes = []) => {
    let response;
    response = await Bumblebee.create();
    if (isCollection) {
      response = response.include(includes).collection(data, transformer);
    } else {
      response = response.include(includes).item(data, transformer);
    }

    return response;
  },
};
