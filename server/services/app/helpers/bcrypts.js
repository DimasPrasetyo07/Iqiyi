const bcryptjs = require('bcryptjs')

const createHashPW = (password) => bcryptjs.hashSync(password)
const compareHashWithPW = (password, hash) => bcryptjs.compareSync(password, hash)

module.exports = {createHashPW, compareHashWithPW}