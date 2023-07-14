import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";
import typeormConfig from "./typeorm.config";
import { Context } from "./types/Context";
import { auth } from "./middlewares/auth";

const PORT = process.env.PORT || 5000;

const main = async () => {
  const conn = await typeormConfig.initialize();

  const server = new ApolloServer<Context>({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req?.headers?.authorization
        ? auth(req.headers.authorization)
        : null;
      return { conn, userId: token?.userId };
    },
    listen: { port: PORT as number },
  });

  console.log(`🚀  Server ready at ${url}`);
};

main();
