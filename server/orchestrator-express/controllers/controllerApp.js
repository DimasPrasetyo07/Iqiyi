const redis = require("../config/ioredis");
const axios = require("axios");
const baseURL = "http://localhost:4002";
const mongoURL = 'http://localhost:4001'

class ControllerApp {
    static async getAllMovies(req, res) {
        try {
            const movies = await redis.get('cache:app')
            if(movies) {
                const data = JSON.parse(movies)
                res.status(200).json(data)
            } else if (!movies) {
                const {data} = await axios ({
                    method: 'get',
                    url: `${baseURL}/movies`
                })
                await redis.set('cache:app', JSON.stringify(data))
                res.status(200).json(data)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async getMovieDetail (req, res) {
        try {
            const {id} = req.params
            const {data : movie} = await axios({
                method: 'get',
                url: `${baseURL}/movies/${id}`
            })
            if (!movie) {
                throw {name: 'Not_Found'}
            }
            const {data : user} = await axios({
                method: 'get',
                url: `${mongoURL}/users/${movie.userMongoId}`
            })
            res.status(200).json({movie: movie, user: user})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async deleteMovie (req, res) {
        try {
            const {id} = req.params
            await redis.del('cache:app')
            await axios({
                method: 'delete',
                url: `${baseURL}/movies/${id}`
            })
            res.status(200).json({message: 'Delete movie success'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async postNewMovie (req, res) {
        try {
            await redis.del('cache:app')
            const {title, synopsis, trailerUrl, imgUrl, rating, genreId, userMongoId, cast} = req.body
            const inputMovie = {title, synopsis, trailerUrl, imgUrl, rating, genreId, userMongoId, cast}
            const newMovie = await axios ({
                method: 'post',
                url: `${baseURL}/movies`,
                data: inputMovie
            })
            res.status(201).json({message: 'Add new movie success'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async editMovie(req, res) {
        try {
            await redis.del("cache:app")
            const {title, synopsis, trailerUrl, imgUrl, rating, genreId} = req.body
            const editForm = {title, synopsis, trailerUrl, imgUrl, rating, genreId }
            let movieId = req.params.id
            let data = await axios({
                method: 'put',
                url: `${baseURL}/movies/${movieId}`,
                data: editForm
            })
            res.status(201).json({message: 'Edit movie success'})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}


module.exports = ControllerApp