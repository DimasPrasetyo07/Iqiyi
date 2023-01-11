const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { appResolver, appTypeDefs } = require('./schemas/appSchema')
const PORT = process.env.PORT || 4000
const {userResolver, userTypeDefs} = require('./schemas/userSchema')


const server = new ApolloServer({
    typeDefs: [userTypeDefs, appTypeDefs],
    resolvers: [userResolver, appResolver]
})

startStandaloneServer(server, {
    listen: {port: PORT},
})
.then(() => {
    console.log(`Connected to apollo server at port ${PORT}`)
})
