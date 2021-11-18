module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    PORT: 5000,
    MONGO_CONNECT: 'mongodb://localhost:27017/users-test',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
}
