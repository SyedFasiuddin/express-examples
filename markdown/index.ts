import express, { Express } from "express";
import fs from "fs";
import { marked } from "marked";
import escapeHtml from "escape-html";
import path from "path";

const app: Express = express();

app.engine("md", (path, _options, callback) => {
    fs.readFile(path, "utf8", (err, str) => {
        if (err) return callback(err);

        const html = escapeHtml(marked.parse(str));
        callback(null, html);
    })
});

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "md");

app.get("/", (_req, res) => {
    res.render("index")
})

app.get("/fail", (_req, res) => {
    res.render("missing")
})

app.listen(3000, () => {
    console.log("Express started on port 3000");
})
