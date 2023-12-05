import { gql } from "@apollo/client";

export const GetAllCars = gql`
    query GetAllPosts {
        posts {
            id
            title
            description
        }
    }
`;

export default GetAllCars;
