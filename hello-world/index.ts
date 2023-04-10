import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello, World");
})

app.listen(3000, () => {
    console.log("Express started on port 3000");
})
