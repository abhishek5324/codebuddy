const dotenv = require('dotenv');
dotenv.config()

const envs = {
    "PORT": process.env.PORT || 3000,
    "DB_URL": process.env.DB_URL
}

module.exports = envs