import express, { Request } from "express";

/**
 * Faux database
 */

const USERS = [
  { name: "tj" },
  { name: "tobi" },
  { name: "loki" },
  { name: "jane" },
  { name: "bandit" }
]

const app = express();

/**
 * Convert :to and :from to integers
 */

app.param(["to", "from"], (_req, res, next, value, _name) => {
  const PARSED_VALUE = parseInt(value, 10);
  if( isNaN(PARSED_VALUE) ){
    res.status(400);
    res.send("failed to parseInt " + value);
  } else {
    next();
  }
});

/**
 * Load user by id
 */

app.param("user", (_req, res, next, id) => {
  const ID = parseInt(id, 10);
  if( isNaN(ID) ){
    res.status(400);
    res.send("failed to parseInt " + id);
  } else {
    next();
  }
});

/**
 * GET index.
 */

app.get("/", (_req, res) => {
  res.send("Visit /user/0 or /users/0-2");
})

/**
 * GET :user.
 */

app.get("/user/:user", (req, res) => {
  const USER = req.params.user;
  res.send("user: " + USER);
})

/**
 * GET users :from - :to.
 */

app.get("/users/:from-:to", (req: Request<{ from: string, to: string}>, res) => {
  const from = parseInt(req.params.from, 10);
  const to = parseInt(req.params.to, 10);
  const names = USERS.map(user => user.name);
  res.send("users " + names.slice(from, to + 1).join(", "));
})

app.listen(3000, () => {
  console.log("Express started on port 3000");
})
