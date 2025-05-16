import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import * as users from "./users_model.mjs";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await users.connect();
  console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new user with the query parameters provided in the body
 */
app.post(
  "/users",
  asyncHandler(async (req, res) => {
    const user = await users.createUser(
      req.body.name,
      req.body.age,
      req.body.email,
      req.body.phoneNumber
    );
    res.status(201).json(user);
  })
);

/**
 * Read using GET /users
 */
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    //build filter from req query
    let filter = {};
    if (req.query.name) {
      filter.name = req.query.name;
    }
    if (req.query.age) {
      filter.age = req.query.age;
    }
    if (req.query.email) {
      filter.email = req.query.email;
    }
    if (req.query.phoneNumber) {
      filter.phoneNumber = req.query.phoneNumber;
    }

    //async call model to search db
    let result = await users.getUsers(filter);

    res.status(200).json(result);
  })
);

/**
 * Read one using GET /users/:id
 */
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id) {
      //call model to find it
      let result = await users.getUserbyID(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      res.status(404).json({ Error: "Not Found" });
    }
  })
);

/**
 * Update using PUT /users/:id
 */
app.put(
  "/users/:id",
  asyncHandler(async (req, res) => {
    //build filter from req query
    let filter = {};
    if (req.body.name) {
      filter.name = req.body.name;
    }
    if (req.body.age) {
      filter.age = req.body.age;
    }
    if (req.body.email) {
      filter.email = req.body.email;
    }
    if (req.body.phoneNumber) {
      filter.phoneNumber = req.body.phoneNumber;
    }

    const id = req.params.id;

    //async call model to search db
    let result = await users.updateUser(id, filter);

    if (result.matchedCount > 0) {
      //call model to find it
      let result = await users.getUserbyID(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      res.status(404).json({ Error: "Not Found" });
    }
  })
);

/**
 * Delete using DELETE /users
 */
app.delete(
  "/users",
  asyncHandler(async (req, res) => {
    //build filter from req query
    let filter = {};
    if (req.query.name) {
      filter.name = req.query.name;
    }
    if (req.query.age) {
      filter.age = req.query.age;
    }
    if (req.query.email) {
      filter.email = req.query.email;
    }
    if (req.query.phoneNumber) {
      filter.phoneNumber = req.query.phoneNumber;
    }

    //async call model to search db
    let result = await users.deleteUsers(filter);

    res.status(200).json({ deletedCount: result.deletedCount });
  })
);

/**
 * delete one using DELETE /users/:id
 */
app.delete(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id) {
      //call model to find it
      let result = await users.deleteUser(id);
      if (result.deletedCount > 0) {
        res.status(204).json({});
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      res.status(404).json({ Error: "Not Found" });
    }
  })
);
