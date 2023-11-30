import {Resolvers} from "../../generated/graphql";
import {prisma} from "../../index";

export const postResolver: Resolvers = {
    Query: {
        async posts() {
            return prisma.post.findMany();
        }
    },

    Mutation: {
        async createPost(_, {postInput}) {
            return prisma.post.create({
                data: {
                    title: postInput.title,
                    description: postInput.description
                }
            })
        },
        async updatePost(_, {updateInput}) {
            return prisma.post.update({
                where: {id: updateInput?.id},
                data: {
                    title: updateInput?.title,
                    description: updateInput?.description
                }
            })
        },

        async deletePost(_, {id}) {
            return prisma.post.delete({
                where: {id: id}
            })
        }
    }
}