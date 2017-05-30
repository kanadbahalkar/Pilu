module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'piluftw',
    // Database connection information
    'database': 'mongodb://koalachat:ANLPX2nPfi6P1sFy@pilu-shard-00-00-5vtre.mongodb.net:27017,pilu-shard-00-01-5vtre.mongodb.net:27017,pilu-shard-00-02-5vtre.mongodb.net:27017/Pilu?ssl=true&replicaSet=Pilu-shard-0&authSource=admin', //ATLAS CLUSTER
    // Setting port for server
    'port': process.env.PORT || 4731,
    'api_server':'https://52.203.15.26:4731/'
}
