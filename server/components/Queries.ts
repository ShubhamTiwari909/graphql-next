import { gql } from "@apollo/client";

export const ALL_USERS = gql`
  query Users {
    users {
      name
      role
      id
      isEmployee
      age
      friends {
        name
        id
      }
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query UserByName($name: String!) {
    userByName(name: $name) {
      role
      name
      isEmployee
      id
      age
      friends {
        name
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($newUser: CreateUser!) {
    createUser(newUser: $newUser) {
      role
      name
      isEmployee
      age
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updatedUser: UpdateUser!) {
    updateUser(updatedUser: $updatedUser) {
      id
      name
      role
      age
      isEmployee
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($delUser: DeleteUser!) {
    deleteUser(delUser: $delUser) {
      id
    }
  }
`;

