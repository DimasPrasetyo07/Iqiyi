const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://dimassds07:kingkong21@project2-phase3.doympia.mongodb.net/?retryWrites=true&w=majority";
const dbName = "graded2_phase3";
const client = new MongoClient(uri);
let db;
async function connect(params) {
  try {
    await client.connect();
    console.log("connected to mongodb!");
    const dbConnection = client.db(dbName)
    db = dbConnection;
    return dbConnection;
  } catch (err) {
    console.log(err);
  }
}

function getDB() {
  return db;
}

module.exports = { connect, getDB };
