const { ApolloServer, gql } = require("apollo-server");

const todos = [
  { task: "Wash Car", completed: true },
  { task: "Wash Car", completed: false },
  { task: "Wash Car", completed: true },
  { task: "Wash Car", completed: false },
  { task: "Wash Car", completed: true },
  { task: "Wash Car", completed: false },
  { task: "Wash Car", completed: true },
];

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },

  Mutation: {
    addTodo(parent, { task, completed }) {
      const todo = { task, completed };
      todos.push(todo);
      return todo;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server started successfully at ${url}`);
});
