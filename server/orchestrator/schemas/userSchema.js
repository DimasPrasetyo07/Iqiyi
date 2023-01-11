// const baseURL = 'https://bukan-iqiyi-user.herokuapp.com'
const baseURL = 'http://localhost:4001'

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis({
    port: 19061,
    host: 'redis-19061.c52.us-east-1-4.ec2.cloud.redislabs.com',
    username: 'default',
    password: 'ffY6lT6LPBxTorhqxtSAGJz7EcmuVhLb',

})

const userTypeDefs = `#graphql
    type Users {
    _id: ID
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
    }

    type Query {
        getUsers: [Users],
        getOneUser(_id: String!): Users
    }

    input NewUserInput{
        username: String!
        email: String!
        password: String!
        phoneNumber: String!
        address: String!
        role: String!
    }
    type Message {
        message: String
    }

    type Mutation {
        addUser(inputUser: NewUserInput) : Message
        deleteUser(_id: String) : Message
    }
    

`;

const userResolver = {
    Query: {
        getUsers: async () => {
            try {   
                const dataUsers = await redis.get('cache:users')
                // const dataUsers = null
                if(dataUsers) {
                    return JSON.parse(dataUsers)
                } else if (!dataUsers) {
                    const {data} = await axios({
                        url: `${baseURL}/users`,
                        method: 'get'
                    })
                    await redis.set('cache:users', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error)
            }
        },
        getOneUser: async (_, args) => {
            try {
                const singleUser = await redis.get(`cache:users-${args.id}`)
                // const singleUser = null
                if(singleUser) {
                    return JSON.parse(singleUser)
                } else if(!singleUser) {
                    const {data} = await axios({
                        method: 'get',
                        url: `${baseURL}/users/${args._id}`
                    })
                    await redis.set(`cache:users-${args.id}`, JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        addUser: async(_, args) => {
            try {
                const {inputUser} = args
                const {data} = await axios({
                    method: 'post',
                    url: `${baseURL}/users`,
                    data: inputUser
                })
                await redis.del('cache:users')
                return data
            } catch (error) {
                console.log(error)
            }
        },
        deleteUser: async(_, args) => {
            try {
                const {data} = await axios({
                    method: 'delete',
                    url: `${baseURL}/users/${args._id}`
                })
                redis.del('cache:users')
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }

}







module.exports = {userResolver, userTypeDefs}

