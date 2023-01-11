const Redis = require('ioredis')
const redis = new Redis({
    port: 19061,
    host: 'redis-19061.c52.us-east-1-4.ec2.cloud.redislabs.com',
    username: 'default',
    password: 'ffY6lT6LPBxTorhqxtSAGJz7EcmuVhLb',

})

module.exports = redis