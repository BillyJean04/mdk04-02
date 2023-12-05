import { gql } from "@apollo/client";

export const CreatePost = gql`
    mutation CreatePost($postInput: PostInput!) {
        createPost(postInput: $postInput) {
            title
            description
        }
    }
`;

export default CreatePost;
