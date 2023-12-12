import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import GetAllCars from "./graphql/queries/GetAllCars.ts";
import CreatePost from "./graphql/mutations/createPost.ts";
import DeletePost from "./graphql/mutations/deletePost.ts";
import UpdatePost from "./graphql/mutations/updatePost.ts";

import Input from "./components/Input.tsx";
import { MdDelete, MdEdit } from "react-icons/md";

import { type Post } from "./__generated__/gql.ts";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto 0 auto;
`;

const FormWrapper = styled.div`
    display: flex;
    align-items: end;
    gap: 20px;
`;

const InputsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    background: #2777ff;
    border: none;
    border-radius: 5px;
    color: #fff;
`;

const PostsWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const Post = styled.div`
    display: flex;
    justify-content: space-between;
    border: 2px solid gray;
    padding: 15px;
    border-radius: 5px;
`;
const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const PostIcons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

function App() {
    const { data, loading } = useQuery(GetAllCars);
    const [postId, setPostId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [createPost] = useMutation(CreatePost, {
        refetchQueries: [GetAllCars, "GetAllCars"],
    });
    const [deletePost] = useMutation(DeletePost, {
        refetchQueries: [GetAllCars, "GetAllCars"],
    });
    const [updatePost] = useMutation(UpdatePost, {
        refetchQueries: [GetAllCars, "GetAllCars"],
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    if (loading) {
        return <>loading</>;
    }

    const handleClick = async () => {
        if (isEditing) {
            await updatePost({
                variables: {
                    updateInput: {
                        id: postId,
                        title: title,
                        description: description,
                    },
                },
            });

            setIsEditing(false);
        } else {
            await createPost({
                variables: {
                    postInput: {
                        title: title,
                        description: description,
                    },
                },
            });
        }
        setTitle("");
        setDescription("");
    };

    const handleClickDelete = async (id: number) => {
        await deletePost({
            variables: {
                deletePostId: id,
            },
        });
    };

    const handleEditPost = async (id: number, title: string, description: string) => {
        if (!isEditing) {
            setPostId(id);
            setTitle(title);
            setDescription(description);
            inputRef.current?.focus();
        } else {
            setTitle("");
            setDescription("");
        }
        setIsEditing(!isEditing);
    };

    return (
        <Wrapper>
            <FormWrapper>
                <InputsWrapper>
                    <InputWrapper>
                        <label htmlFor="title">Title</label>
                        <Input ref={inputRef} id="title" value={title} setValue={setTitle} />
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="description">Description</label>
                        <Input id="description" value={description} setValue={setDescription} />
                    </InputWrapper>
                </InputsWrapper>
                <Button onClick={handleClick}>{isEditing ? "Update Post" : "Create Post"}</Button>
            </FormWrapper>
            <PostsWrapper>
                {data?.posts.map((elem: Post) => (
                    <Post key={elem.id}>
                        <PostContent>
                            <div>{elem.title}</div>
                            <div>{elem.description}</div>
                        </PostContent>
                        <PostIcons>
                            <MdEdit
                                onClick={() => handleEditPost(elem.id as number, elem.title, elem.description)}
                                style={{ cursor: "pointer" }}
                                size="1.2rem"
                            />
                            <MdDelete
                                onClick={() => handleClickDelete(elem.id as number)}
                                style={{ cursor: "pointer" }}
                                size="1.2rem"
                            />
                        </PostIcons>
                    </Post>
                ))}
            </PostsWrapper>
        </Wrapper>
    );
}

export default App;
