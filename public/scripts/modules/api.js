const apiUrl = "<%- process.env.API_URL %>";

const fetchEntries = async () => {
    return await fetch(`${apiUrl}/gebruikers`)
        .then((res) => res.json())
        .then((json) => json);
};
