// const baseURL = "https://bukan-iqiyi-app.herokuapp.com";
const baseUrl = "http://localhost:4001"
// const userURL = "https://bukan-iqiyi-user.herokuapp.com";
const userUrl = "http://localhost:4002"

const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({
  port: 19061,
  host: "redis-19061.c52.us-east-1-4.ec2.cloud.redislabs.com",
  username: "default",
  password: "ffY6lT6LPBxTorhqxtSAGJz7EcmuVhLb",
});

const appTypeDefs = `#graphql
    type Movies {
        id: ID,
        title: String,
        slug: String,
        synopsis: String
        trailerUrl: String,
        imgUrl: String,
        genreId: ID,
        userMongoId: String,
        Genre: Genres
    }
    type Genres {
        id: ID,
        name: String
    }
    type Casts {
        id: ID,
        movieId: ID,
        name: String,
        profilePict: String,
        Movie: Movies

    }
    type MovieDetail {
        id: ID,
        title: String,
        slug: String,
        synopsis: String
        trailerUrl: String,
        imgUrl: String,
        rating: Int
        genreId: ID,
        userMongoId: String,
        Genre: Genres,
        Casts: [Casts],
        User: Users

    }

    type Users {
    _id: ID
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
    }
    
    type Message {
        message: String
    }
    input NewMovieForm{
        title: String
        synopsis: String
        trailerUrl: String
        imgUrl: String
        rating: Int
        genreId: Int
        userMongoId: String
        cast: [NewCastInput]
    }
    input NewCastInput{
        name: String,
        profilePict: String,
        
    }
    input EditMovieForm{
        id: ID
        title: String
        synopsis: String
        trailerUrl: String
        imgUrl: String
        rating: Int
        genreId: Int
    }


    type Query {
        getMovies: [Movies],
        getMovieDetail(id: String!): MovieDetail
        getGenres: [Genres]
        getCasts: [Casts]
        getUsers: [Users],
    }
    type Mutation {
        deleteMovie(id: String) : Message
        addMovie(inputMovie: NewMovieForm): Message
        editMovie(id: String, inputEditMovie: EditMovieForm): Message
    }

`;

const appResolver = {
  Query: {
    getMovies: async () => {
      try {
        const allMovie = await redis.get("cache:app");
        // const allMovie = null
        if (allMovie) {
          return JSON.parse(allMovie);
        } else if (!allMovie) {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/movies`,
          });
          await redis.set("cache:app", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getMovieDetail: async (_, args) => {
      try {
        const singleMovie = await redis.get(`cache:movieDetail-${args.id}`);
        // const singleMovie = null;
        if (singleMovie) {
          return JSON.parse(singleMovie);
        } else if (!singleMovie) {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/movies/${args.id}`,
          });
          const userMongoId = data.userMongoId
          const {data: user} = await axios({
            method: 'get',
            url: `${userURL}/users/${userMongoId}`
          })
          data.User = user
          await redis.set(`cache:movieDetail-${args.id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        // console.log(error);
      }
    },
    getGenres: async () => {
      try {
        const allGenres = await redis.get("cache:genres");
        // const allGenres = null;
        if (allGenres) {
          return JSON.parse(allGenres);
        } else if (!allGenres) {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/genres`,
          });
          await redis.set("cache:app", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getCasts: async () => {
      try {
        const allCasts = await redis.get("cache:casts");
        // const allCasts = null
        if (allCasts) {
          return JSON.parse(allCasts);
        } else if (!allCasts) {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/casts`,
          });
          await redis.set("cache:casts", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    deleteMovie: async (_, args) => {
      try {
        const { data } = await axios({
          method: "delete",
          url: `${baseURL}/movies/${args.id}`,
        });
        redis.del("cache:app");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    addMovie: async (_, args) => {
      try {
        const { inputMovie } = args;
        const { data } = await axios({
          method: "post",
          url: `${baseURL}/movies`,
          data: inputMovie,
        });
        await redis.del("cache:app");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editMovie: async (_, args) => {
      try {
        const { inputEditMovie, id } = args;
        const { data } = await axios({
          method: "put",
          url: `${baseURL}/movies/${id}`,
          data: inputEditMovie,
        });
        await redis.del(`cache:movieDetail-${args.id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { appTypeDefs, appResolver };
