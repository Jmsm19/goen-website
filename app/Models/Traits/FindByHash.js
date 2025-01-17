/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const Hashids = use('Hashids');

class FindByHash {
  register(Model) {
    /**
     * Decodes the hashed primary key
     * and finds a row using the decoded key
     * or fail with an exception
     *
     * @async
     * @method — findByOrFail
     * @throws — {ModelNotFoundException} If unable to find row
     */
    const findByHashOrFail = async hashedId => {
      const decodedId = Hashids.decode(hashedId)[0];
      const model = await Model.findOrFail(decodedId || null);
      return model;
    };

    const findByHash = async hashedId => {
      const decodedId = Hashids.decode(hashedId)[0];
      const model = await Model.find(decodedId || null);
      return model;
    };

    Model.findByHash = findByHash;
    Model.findByHashOrFail = findByHashOrFail;
  }
}

module.exports = FindByHash;
