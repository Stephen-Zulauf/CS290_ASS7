import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await users.connect()
    console.log(`Server listening on port ${PORT}...`);
});



/**
 * Create a new user with the query parameters provided in the body
 */
app.post('/users', asyncHandler(async (req, res) => {
    const user = await users.createUser(req.body.name, 
                            req.body.age, 
                            req.body.email,
                            req.body.phoneNumber);
    res.status(201).json(user);
}));
