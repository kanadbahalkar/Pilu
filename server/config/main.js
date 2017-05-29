module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'piluftw',
    // Database connection information
    // 'database': 'mongodb://kandyrox:kandyrox2017@ds049104.mlab.com:49104/heroku_7pv27c4s',
    'database': 'mongodb://koalachat:ANLPX2nPfi6P1sFy@pilu-shard-00-00-5vtre.mongodb.net:27017,pilu-shard-00-01-5vtre.mongodb.net:27017,pilu-shard-00-02-5vtre.mongodb.net:27017/Pilu?ssl=true&replicaSet=Pilu-shard-0&authSource=admin', //ATLAS CLUSTER
    // 'database': 'localhost:27017',
    // Setting port for server
    'port': process.env.PORT || 4731,
    'api_server':'https://localhost:4731/'
}
