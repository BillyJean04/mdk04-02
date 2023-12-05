import { gql } from "@apollo/client";

export const DeletePost = gql`
    mutation DeletePost($deletePostId: Int!) {
        deletePost(id: $deletePostId) {
            id
        }
    }
`;

export default DeletePost;
