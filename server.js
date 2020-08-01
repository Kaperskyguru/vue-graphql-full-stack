const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

require("dotenv").config();

const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`DB connected`))
  .catch((err) => console.error(err));

// const typeDefs = gql`
//   type Todo {
//     task: String
//     completed: Boolean
//   }

//   type Query {
//     todos: [Todo]
//   }
// `;

const server = new ApolloServer({
  typeDefs,
  context: {
    Post,
    User,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server started successfully at ${url}`);
});
