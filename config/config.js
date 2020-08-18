module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl:`mongodb+srv://user:Vanina77@expressjs-20.bdqqj.mongodb.net/cubicle?retryWrites=true&w=majority`
        //databaseUrl:'mongodb://localhost:27017/',
    },
    production: {}
};