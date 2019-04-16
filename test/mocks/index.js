/** @type {typeof import('adonis-bumblebee/src/Bumblebee')} */
const Bumblebee = use('Adonis/Addons/Bumblebee');

module.exports = {
  getTransformedResponse: async (data, transformer, isCollection = false) => {
    let response;
    response = await Bumblebee.create();
    if (isCollection) {
      response = response.collection(data, transformer);
    } else {
      response = response.item(data, transformer);
    }

    return response;
  },
};
