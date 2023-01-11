const bcryptjs = require('bcryptjs')

const hashPassword = (password) => bcryptjs.hashSync(password)


module.exports = {hashPassword}