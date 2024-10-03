const axios = require("./tmdb.client");
const tmdbEndpoints = require("../tmdb.endpoints");

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axios.get(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })),
  
  mediaDetail: async ({ mediaType, mediaId }) =>
    await axios.get(tmdbEndpoints.mediaDetail({ mediaType, mediaId })),

  mediaGenres: async ({ mediaType }) =>
    await axios.get(tmdbEndpoints.mediaGenres({ mediaType })),

  mediaCredits: async ({ mediaType, mediaId }) =>
    await axios.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),

  mediaVideos: async ({ mediaType, mediaId }) =>
    await axios.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),

  mediaImages: async ({ mediaType, mediaId }) =>
    await axios.get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),

  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axios.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),

  mediaSearch: async ({ mediaType, query, page }) =>
    await axios.get(tmdbEndpoints.mediaSearch({ mediaType, query, page })),

  personDetail: async ({ personId }) =>
    await axios.get(tmdbEndpoints.personDetail({ personId })),

  personMedias: async ({ personId }) =>
    await axios.get(tmdbEndpoints.personMedias({ personId }))
};

module.exports = {tmdbApi};
