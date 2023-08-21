const { ApolloServer } = require("apollo-server")
const { typeDefs } = require("./schema/type-defs")
const { resolvers } = require("./schema/resolvers")

const server = new ApolloServer({
    typeDefs, resolvers, context: (() => {
        return { value: "Authentication" }
    })
});

server.listen().then(({ url }) => {
    console.log(`server running at ${url}`)
})