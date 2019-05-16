module.exports = {
    server: process.env.server || 'development',
    port: process.env.port || '3000',
    host: process.env.host || 'http://172.16.7.35:4200/',
    database: process.env.database || {
        name: 'price_evaluation',
        server: 'localhost',
        port: '27017'
    },
    secret_key: 'supersecret',
    api_key: 'fb0125735429mklp'

}
