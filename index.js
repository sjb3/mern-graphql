// const express = require('express');
// const graphqlHTTP = require('express-graphql');

// const { buildSchema } = require('graphql');
// const crypto = require('crypto');

// const app = express();
// const PORT = process.env.port || '3000';

// const db = {
//   users: [
//     {
//       id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https://gravatar.com/...',
//     },
//     {
//       id: '2', email: 'blex@gmail.com', name: 'Blex', avatarUrl: 'https://gravatar.com/...',
//     },
//     {
//       id: '3', email: 'clex@gmail.com', name: 'Clex', avatarUrl: 'https://gravatar.com/...',
//     },
//   ],
//   messages: [
//     {
//       id: '1', userId: '1', body: '1ullo!', createdAt: Date.now(),
//     },
//     {
//       id: '2', userId: '2', body: '2ullo!', createdAt: Date.now(),
//     },
//     {
//       id: '3', userId: '1', body: '3ullo!', createdAt: Date.now(),
//     },
//   ],
// };

// // Object.assign() method is used to copy the values of all enumerable own properties
// // from one or more source objects to a target object. It will return the target object.

// class User {
//   constructor(user) {
//     Object.assign(this, user);
//   }
//   messages() {
//     return db.messages.filter(message => message.userId === this.id);
//   }
// }

// const schema = buildSchema(`
//   type Query {
//     users: [User!]!
//     user(id: ID!): User
//     messages: [Message!]!
//   }

//   type Mutation {
//     addUser(email: String!, name: String): User
//   }

//   type User {
//     id: ID!
//     email: String!
//     name: String
//     avatarUrl: String
//     messages: [Message!]!
//   }

//   type Message {
//     id: ID!
//     body: String!
//     createdAt: String!
//   }
// `);

// const rootValue = {
//   users: () => db.users.map(user => new User(user)),
//   user: args => db.users.find(user => user.id === args.id),
//   messages: () => db.messages,
//   addUser: ({ email, name }) => {
//     const user = {
//       id: crypto.randomBytes(10).toString('hex'),
//       email,
//       name,
//     };
//     db.users.push(user);
//     return user;
//   },
// };


// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue,
//   graphiql: true,
// }));

// app.listen(PORT, () => {
//   console.log(`>>>>>  Server running on port: ${PORT}`);
// });

const { ApolloServer, gql } = require('apollo-server');
const crypto = require('crypto');


const db = {
  users: [
    {
      id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https:gravatar.com/...',
    },
    {
      id: '2', email: 'blex@gmail.com', name: 'Blex', avatarUrl: 'https:gravatar.com/...',
    },
    {
      id: '3', email: 'clex@gmail.com', name: 'Clex', avatarUrl: 'https:gravatar.com/...',
    },
  ],
  messages: [
    {
      id: '1', userId: '1', body: '1ullo!', createdAt: Date.now(),
    },
    {
      id: '2', userId: '2', body: '2ullo!', createdAt: Date.now(),
    },
    {
      id: '3', userId: '1', body: '3ullo!', createdAt: Date.now(),
    },
  ],
};

const typeDefs = gql`
   type Query {
     users: [User!]!
     user(id: ID!): User
     messages: [Message!]!
   }

   type Mutation {
     addUser(email: String!, name: String): User
   }

   type User {
     id: ID!
     email: String!
     name: String
     avatarUrl: String
     messages: [Message!]!
   }

   type Message {
     id: ID!
     body: String!
     createdAt: String!
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: args => db.users.find(user => user.id === args.id),
    messages: () => db.messages,
  },

  Mutation: {
    addUser: ({ email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name,
      };
      db.users.push(user);
      return user;
    },
  },

  User: {
    messages: (id) => {
      db.messages.filter(message => message.userId === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then((serverInfo) => {
  console.log(`>>>>> Apollo Server running at ${serverInfo.url}`);
});
