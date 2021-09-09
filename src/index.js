const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const redis = require('redis');




const resolvers = {
  Query,
  Mutation,
}


const clientA = new PrismaClient({
  datasources: { db: { url: 'file:./serviceA.db'}},
})

const clientB = new PrismaClient({
  datasources: { db: { url: 'file:./serviceB.db'}},
})

const redisClient = new redis.createClient(6379, 'localhost');
redisClient.on("error", function(error) {
  console.error(error);
});

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    clientA,
    clientB,
    redisClient,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
