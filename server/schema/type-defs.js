const { gql } = require("apollo-server")

const typeDefs = gql`
    
    type User {
        id: ID! # uniquely identifies but similar to strings
        name: String!
        age: Int!
        isEmployee: Boolean!
        role: Role!
        friends: [User] # It will have a list of Users with same data as User schema
    }

    input CreateUser {
        name: String!
        age: Int!
        isEmployee: Boolean = true
        role: Role!
    }

    input UpdateUser {
        id: ID!
        name: String!
        age: Int!
        isEmployee: Boolean = true
        role: Role!
    }

    input DeleteUser {
        id: ID!
    }

    type Query {
        users: [User!]! 
        user(id: ID!): User! 
        userByName(name: String!): User! 
    }

    type Mutation {
        createUser(newUser:CreateUser!):User
        updateUser(updatedUser:UpdateUser!):User
        deleteUser(delUser:DeleteUser!):User
    }


    # Enums to define some fix values for a field
    enum Role {
        WebDeveloper
        Tester
        SoftwareEngineer
    }

`;

module.exports = { typeDefs };