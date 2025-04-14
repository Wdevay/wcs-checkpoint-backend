import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/Countries";
import { datasource } from "./datasource";

async function initialize() {
    await datasource.initialize();
    console.log("Datasource is connected");

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
    });
    console.log(`GraphQL server ready at ${url}`);
}  

initialize();