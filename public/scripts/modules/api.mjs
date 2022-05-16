export const useAPI = () => {
    const createUser = async (User) => {
        return await fetch(`/create`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: User.name,
                email: User.email,
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);
    };

    const fetchAll = async () => {
        return await fetch(`/gebruiker/`)
            .then((res) => res.json())
            .catch((err) => err);
    };

    const fetchOne = async (id) => {
        return await fetch(`/gebruiker/${id}`)
            .then((res) => res.json())
            .catch((err) => err);
    };

    const updateUser = async (User) => {
        console.log(User, User.id);
        return await fetch(`/update`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: User.id,
                name: User.name,
                email: User.email,
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);
    };

    const deleteUser = async (id) => {
        console.log(id);
        return await fetch(`delete`, {
            method: "POST",
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);
    };

    return {
        createUser,
        fetchAll,
        fetchOne,
        updateUser,
        deleteUser,
    };
};
