
var { buildSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');

// backend data
const Book = require('../models/book');
const Author = require('../models/author');

// test data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: "1", authorId: "1" },
    { name: 'Name of the Water', genre: 'Fantasy', id: "2", authorId: "2" },
    { name: 'Name of the Watsdfgdsfger', genre: 'dfgdfgd', id: "4", authorId: "1" },
    { name: 'Name of the Wind', genre: 'Sci-Fi', id: "3", authorId: "3" }
]

var authors = [
    { name: 'Author 1', age: 22, id: "1" },
    { name: 'Author 2', age: 23, id: "2" },
    { name: 'Author 3', age: 24, id: "3" }
]

// schema

// type definition
const typeDefs = `
    type Query {
        book(id: ID!): Book
        author(id: ID!): Author
        books: [Book]
        authors: [Author]
    }

    type Book {
        id: ID!
        name: String!
        genre: String!
        """
        This takes all the parameters of author, it returns a single object
        """
        author: Author
    }

    type Author {
        id: ID!
        name: String!
        age: Int!
        """
        Returns list of books
        """
        books: [Book]
    }
`;
// resolver
const resolvers = {
    Query: {
        book: (root, args, context, info) => {
            return books.filter(e => e.id == args.id)[0]
        },
        author: (root, args, context, info) => {
            return authors.filter(e => e.id == args.id)[0]
        },
        books: () => {return books},
        authors: () => {return authors},
    },
    // these r when one modal is appended inside another
    Author: {
        books: (root) => {
            return books.filter(e => e.authorId == root.id)
        }
    },
    Book: {
        author: (root) => {
            return authors.filter(e => e.id == root.authorId)[0]
        },
    },
}

var schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema