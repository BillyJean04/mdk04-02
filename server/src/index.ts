import express from "express";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";
import {ApolloServer} from "@apollo/server";
import cors from "cors";
import {expressMiddleware} from "@apollo/server/express4";
import {readFileSync} from "fs";
import path from "path";
import {resolvers} from "./graphql";
export const prisma = new PrismaClient();

const userTypes = readFileSync(path.join(__dirname, "./graphql/typeDefs/post.graphql"), {
    encoding: "utf-8",
});
export const typeDefs = `
    ${userTypes}
`;

dotenv.config();

const app = express();

const port  = process.env.PORT || 4000;

const bootstrapServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use("/graphql", expressMiddleware(server, {}));

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen(port, () => {
        console.log(`🚀 Express ready at http://localhost:${port}`);
        console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
    });
}

bootstrapServer();