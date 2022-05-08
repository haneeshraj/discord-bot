const embedResponse = require("../functions/embedMessage.js");
const axios = require("axios");

module.exports = {
  name: "movie",
  description: "Responds with a random movie",
  type: "fun",
  async run(client, message, args) {
    let randPage = Math.floor(Math.random() * 20) + 1;
    let randMovie = Math.floor(Math.random() * 20) + 1;
    const fetchData = async () => {
      try {
        const { data: movieData } = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=1556a051ebeab8795422fe5cfcd0bea3&language=en-US&page=${randPage}`
        );
        const { data: movieImage } = await axios.get(
          `https://image.tmdb.org/t/p/w220_and_h330_face${movieData.backdrop_path}`
        );
        return { movie: movieData, image: movieImage };
      } catch (error) {
        console.error(error);
      }
    };
    console.log(fetchData);
  },
};
