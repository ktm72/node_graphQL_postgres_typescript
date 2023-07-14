import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";

const PORT = process.env.PORT || 5000;

const main = async () => {
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT as number },
  });

  console.log(`🚀  Server ready at ${url}`);
};

main();
