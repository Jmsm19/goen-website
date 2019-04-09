/* eslint-disable class-methods-use-this */
/** @type {typeof import('superagent')} */
const superagent = use('superagent');

const { sendErrorResponse } = require('../../Utils/index');

class ApiController {
  /**
   * Makes a request to Anime API and returns an array of anime titles based on query
   *
   *
   * @param {*} { response, request }
   * @returns
   * @memberof ApiController
   */
  getAnimes({ response, request }) {
    // const { t } = request.get();

    return response.status(404).json({
      data: [],
    });
  }

  /**
   * Makes a request to Omdb API and returns an array of movie titles based on query
   *
   * @param {*} { response, request }
   * @returns
   * @memberof ApiController
   */
  async getMovies({ response, request }) {
    const { t } = request.get();

    const OMDB_API_KEY = '11a0bd69';
    const OMDB_API_URL = `http://www.omdbapi.com/?apiKey=${OMDB_API_KEY}&type=movie`;

    return superagent
      .get(`${OMDB_API_URL}&plot=short&s=${t}`)
      .then(({ body }) => {
        if (body.Response === 'False') {
          throw Error(body.Error);
        }

        return {
          data: body.Search,
        };
      })
      .catch(error => {
        if (error.code === 'ENOTFOUND') {
          return sendErrorResponse(response, 'Check your internet connection.');
        }

        return sendErrorResponse(response, error.message || error);
      });
  }
}

module.exports = ApiController;
