const express = require('express');
const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
const mongoose = require('mongoose');

// new schema
const new_schema = require('./schema/schema_new')

const app = express();

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));

// new schema creation
app.use('/graphqlnew', graphqlHTTP({
    schema: new_schema,
    graphiql: true
}));


// mongodb connections
mongoose.connect('mongodb://localhost:27017/first_graphql', {useNewUrlParser: true})
mongoose.connection.once('open', ()=> console.log('DataBase Connected!!'))
    
port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})