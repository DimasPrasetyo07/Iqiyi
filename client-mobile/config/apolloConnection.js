import { ApolloClient, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
    uri: 'http://localhost:4000',
    // uri: "https://0d5c-139-228-111-125.ap.ngrok.io",
    // uri: "https://bukan-iqiyi-orkestrator.herokuapp.com/",
    cache: new InMemoryCache()
})

export default client