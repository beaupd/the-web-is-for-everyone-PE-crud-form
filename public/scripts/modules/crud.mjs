import { useAPI } from "./api.mjs";

export const useCRUD = () => {
    const { createUser, fetchOne, fetchAll, updateUser, deleteUser } = useAPI();

    const Create = (User) => createUser(User);

    const Read = async (id = null) => (id ? fetchOne(id) : fetchAll());

    const Update = (User) => updateUser(User);

    const Delete = (id) => deleteUser(id);

    return { Create, Read, Update, Delete };
};
