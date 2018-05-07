const { graphql, buildSchema } = require('graphql');

const db = {
  users: [
    { id: '1', email: 'alex@gmail.com', name: 'Alex'},
    { id: '2', email: 'blex@gmail.com', name: 'Blex'},
    { id: '3', email: 'clex@gmail.com', name: 'Clex'},
  ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
  }
`)

const rootValue = {
 users: () => db.users
}

graphql(
  schema,
  `
  {
    users {
      id
      email
      name
    }
  }
  `,
  rootValue
).then(
  res => console.dir(res, {depth: null})
).catch(
  console.error
)
