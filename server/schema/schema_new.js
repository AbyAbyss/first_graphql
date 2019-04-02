
var { buildSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');

// backend data
const Book = require('../models/book');
const Author = require('../models/author');

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
        authorId: ID
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

    type Mutation{
        addAuthor(name: String!, age: Int!): Author
        addBook(name: String!, genre: String!, authorId: ID!): Book
    }
`;
// resolver
const resolvers = {
    Query: {
        book: (root, args, context, info) => {
            return Book.findById(args.id)
        },
        author: (root, args, context, info) => {
            return Author.findById(args.id)
        },
        books: () => {return Book.find({})},
        authors: () => {return Author.find({})},
    },
    // these r when one modal is appended inside another
    Author: {
        books: (root) => {
            return Book.find({authorId:root.id})
        }
    },
    Book: {
        author: (root) => {
            return Author.findById(root.authorId)
        },
    },
    // mutation
    Mutation: {
        addAuthor: (root, args) => {
            let author = new Author({
                name: args.name,
                age: args.age
            });
            return author.save()
        },
        addBook: (root, args) => {
            let book = new Book({
                name: args.name,
                genre: args.genre,
                authorId: args.authorId
            })
            return book.save();
        }
      }
}

var schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema