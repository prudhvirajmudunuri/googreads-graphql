const fetch = require('node-fetch')
var promisify = require("promisify-node");
const parseXML = promisify(require('xml2js').parseString)
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml =>
        console.log(xml)
    },
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetch(
          `https://www.goodreads.com/author/show.xml?id=${args.id}&key=9klGjjJxYSNxBjDS1OPXQ `
        )
        .then(response => response.text())
        .then(parseXML)
      }
    })
  })
})
