import { gql } from "@apollo/client";

export const UpdatePost = gql`
    mutation UpdatePost($updateInput: UpdateInput!) {
        updatePost(updateInput: $updateInput) {
            id
        }
    }
`;

export default UpdatePost;
