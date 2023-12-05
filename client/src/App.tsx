import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import GetAllCars from "./graphql/queries/GetAllCars.ts";
import CreatePost from "./graphql/mutations/createPost.ts";
import DeletePost from "./graphql/mutations/deletePost.ts";
import UpdatePost from "./graphql/mutations/updatePost.ts";

import Input from "./components/Input.tsx";
import { MdDelete, MdEdit } from "react-icons/md";

import { type Post } from "./__generated__/gql.ts";

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
        <div className="flex flex-col items-center h-[100dvh] pt-10 gap-5 container mx-auto">
            <div className="flex items-end gap-4">
                <div className="flex items-center gap-7">
                    <div className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <Input ref={inputRef} id="title" value={title} setValue={setTitle} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description">Description</label>
                        <Input id="description" value={description} setValue={setDescription} />
                    </div>
                </div>
                <button onClick={handleClick} className="bg-blue-500 text-white rounded p-2">
                    {isEditing ? "Update Post" : "Create Post"}
                </button>
            </div>
            <div className="flex justify-center flex-col gap-3 w-full">
                {data?.posts.map((elem: Post) => (
                    <div key={elem.id} className="flex justify-between border-gray-500 border-[1px] p-5 rounded">
                        <div>
                            <div>{elem.title}</div>
                            <div>{elem.description}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <MdEdit
                                onClick={() => handleEditPost(elem.id as number, elem.title, elem.description)}
                                className="cursor-pointer"
                                size="1.2rem"
                            />
                            <MdDelete
                                onClick={() => handleClickDelete(elem.id as number)}
                                className="cursor-pointer"
                                size="1.2rem"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
