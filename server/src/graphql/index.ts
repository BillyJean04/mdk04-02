import {postResolver} from "./resolvers/post.resolver";

export const resolvers = {
    Query: {
        ...postResolver.Query,
    },
    Mutation: {
        ...postResolver.Mutation,
    },
};