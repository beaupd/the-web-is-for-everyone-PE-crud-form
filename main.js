require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// use bodyparser for http body parsing
app.use(bodyParser.urlencoded({ extended: true }));

// Stel ejs in als template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Stel een static map in
app.use(express.static("public"));
app.use("/scripts", express.static("public/scripts"));
app.use("/modules", express.static("public/scripts/modules"));
app.use("/styles", express.static("public/styles/"));

// Maak een route voor de index
app.get("/", (req, res) => {
    // res.send('Hello world!')
    res.render("index", {
        pageTitle: "Index",
    });
});

app.get("/read", async (req, res) => {
    const entries = await fetch(`${process.env.API_URL}/gebruikers`)
        .then((res) => res.json())
        .then((json) => json.data);
    res.render("read", {
        pageTitle: "Read",
        entries,
    });
});

app.get("/read/:id", async (req, res) => {
    const entry = await fetch(
        `${process.env.API_URL}/gebruikers/${req.params.id}`
    )
        .then((res) => res.json())
        .then((json) => json.data[0])
        .catch((err) => res.json(err));
    res.render("entry", {
        pageTitle: entry.name,
        entry,
    });
});

app.get("/gebruiker", async (req, res) => {
    const entries = await fetch(`${process.env.API_URL}/gebruikers`)
        .then((res) => res.json())
        .then((json) => json.data);
    res.json(entries);
});

app.get("/gebruiker/:id", async (req, res) => {
    const entry = await fetch(
        `${process.env.API_URL}/gebruikers/${req.params.id}`
    )
        .then((res) => res.json())
        .then((json) => json.data[0])
        .catch((err) => res.json(err));
    res.json(entry);
});

app.post("/create", async (req, res) => {
    const response = await fetch(`${process.env.API_URL}/gebruikers`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            naam: req.body.name,
            email: req.body.email,
        }),
    });
    if (req.body.fromForm && response.ok) {
        res.redirect("/read");
    } else if (response.ok) {
        // return success
        res.json(await response.json());
    }
});

app.post("/update", async (req, res) => {
    const response = await fetch(
        `${process.env.API_URL}/gebruikers/${req.body.id}`,
        {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                gebruiker_id: req.body.id,
                naam: req.body.name,
                email: req.body.email,
            }),
        }
    ).then((res) => res.json());
    res.json(response);
});

app.post("/delete", async (req, res) => {
    const response = await fetch(
        `${process.env.API_URL}/gebruikers/${req.body.id}`,
        {
            method: "DELETE",
        }
    ).then((res) => res.json());
    res.json(response);
});

// app.patch("/update")

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), function () {
    console.log(`Application started on port: ${app.get("port")}`);
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .then((body) => body.data)
        .catch((error) => error);
}
