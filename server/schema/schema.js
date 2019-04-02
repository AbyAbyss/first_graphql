const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// test data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: "1" },
    { name: 'Name of the Water', genre: 'Fantasy', id: "2" },
    { name: 'Name of the Wind', genre: 'Sci-Fi', id: "3" }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // code to get data from db/ other source
                console.log(books.filter(e => e.id == args.id))
                return books.filter(e => e.id == args.id)[0]
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
})