import { useCRUD } from "./crud.mjs";

export const useEnhanced = () => {
    const { Read, Create, Delete, Update } = useCRUD();
    let entries = undefined;
    let isLoading = false;
    let loadingElement = undefined;
    let loadingMessage = undefined;
    let form = undefined;
    let formValues = undefined;

    const addStyles = async () => {
        return new Promise((resolve, reject) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = "./styles/index.css";
            document.head.appendChild(link);
            link.onload = () => {
                resolve("Loaded styles");
            };
            link.onerror = () => {
                reject("Error while loading styles");
            };
        });
    };

    const initLoader = () => {
        loadingElement = document.createElement("section");
        loadingElement.classList.add("loadingSection");
        const loadingMessageElement = document.createElement("span");
        loadingElement.innerHTML = "Loading...";
        loadingElement.appendChild(loadingMessageElement);
        loadingMessage = (msg) =>
            (loadingMessageElement.innerHTML += `${msg}<br/>`);
        document.body.appendChild(loadingElement);
    };

    const setLoader = (state) => {
        isLoading = state;
        if (loadingElement)
            isLoading
                ? loadingElement.classList.add("loading")
                : loadingElement.classList.remove("loading");
    };

    const loaderMSG = (msg) => {
        if (loadingMessage) loadingMessage(msg);
    };

    const fetchEntries = async () => {
        entries = await Read();
        return "Fetched entries";
    };

    const getEntries = () => {
        return entries;
    };

    const handleForm = (value) => {
        switch (value) {
            case "delete":
                // handle delete
                Delete(form.querySelector("input[name='id']").value);
                break;
            case "submit":
                // handle create
                Create({
                    name: form.querySelector("input[name='name']").value,
                    email: form.querySelector("input[name='email']").value,
                });
                break;
            case "update":
                // handle update
                Update({
                    id: form.querySelector("input[name='id']").value,
                    name: form.querySelector("input[name='name']").value,
                    email: form.querySelector("input[name='email']").value,
                });
                break;
        }
    };

    const populateEntries = async () => {
        let ul = document.querySelector("ul");
        entries.forEach((entry) => {
            let li = document.createElement("li");
            li.innerHTML = entry.naam;
            let button = document.createElement("button");
            button.innerHTML = "Select";
            button.onclick = () => {
                viewEntry(entry);
            };

            li.appendChild(button);
            ul.appendChild(li);
        });
    };

    const viewEntry = (entry) => {
        let submitButton = form.querySelectorAll("input[type='submit']")[0];
        if (submitButton.value == "submit") submitButton.value = "update";

        form.querySelector("input[name='id']").value = entry.gebruiker_id;
        form.querySelector("input[name='name']").value = entry.naam;
        form.querySelector("input[name='email']").value = entry.email;
    };

    const enhanceDOM = () => {
        return new Promise(async (res) => {
            form = document.querySelector("form");
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                handleForm(e.submitter.value);
            });

            let deleteButton = document.createElement("input");
            deleteButton.type = "submit";
            deleteButton.value = "delete";
            form.querySelector("span").appendChild(deleteButton);

            await populateEntries();

            res("Enhanced DOM");
        });
    };

    return {
        addStyles,
        initLoader,
        setLoader,
        loaderMSG,
        fetchEntries,
        getEntries,
        enhanceDOM,
    };
};
