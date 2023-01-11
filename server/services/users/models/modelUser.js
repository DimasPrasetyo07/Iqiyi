const { getDB } = require ('../config/mongo-connection')
const { ObjectId } = require('mongodb')

class User {
    static model() {
        const db = getDB()
        return db.collection('users')
    }
    static findAll() {
        return this.model().find().project({password:0}).toArray()
    }
    static findById(id) {
        return this.model().findOne({_id: ObjectId(id)}, { projection: {password:0}  })
    }
    static createUser(input) {
        return this.model().insertOne(input)
    }
    static deleteUser(id) {
        return this.model().deleteOne({_id: ObjectId(id)})
    }

}

module.exports = User