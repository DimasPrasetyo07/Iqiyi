import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      id
      title
      synopsis
      trailerUrl
      imgUrl
      userMongoId
      Genre {
        name
      }
    }
  }
`;

export const GET_MOVIE_DETAIL = gql`
  query GetMovieDetail($getMovieDetailId: String!) {
    getMovieDetail(id: $getMovieDetailId) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      userMongoId
      Genre {
        name
      }
      Casts {
        name
        profilePict
      }
      User {
        username
        email
        role
      }
    }
  }
`;
