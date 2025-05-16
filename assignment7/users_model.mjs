// Get the mongoose object
import mongoose from "mongoose";
import "dotenv/config";

const USER_CLASS = "User";

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    connection = mongoose.connection;
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.log(err);
    throw Error(`Could not connect to MongoDB ${err.message}`);
  }
}

/**
 * Define the schema
 */
const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phoneNumber: Number,
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const User = mongoose.model(USER_CLASS, userSchema);

/**
 * Create a user
 * @param {String} name
 * @param {Number} age
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createUser = async (name, age, email, phoneNumber) => {
  // Call the constructor to create an instance of the model class User
  const user = new User({
    name: name,
    age: age,
    email: email,
    phoneNumber: phoneNumber,
  });
  // Call save to persist this object as a document in MongoDB
  return user.save();
};

/**
 * Get user(s)
 * @returns A promise. Resolves to an array of JSON objects that match the filter
 */
const getUsers = async (filter) => {
  const query = User.find(filter);
  return query.exec();
};

/**
 * Get user by id
 * @returns A promise.
 */
const getUserbyID = async (id) => {
  const query = User.findById(id);
  return query.exec();
};

/**
 * Update user by id (non - replacment)
 * @returns A promise.
 */
const updateUser = async (id, body) => {
  const query = await User.findById(id).updateOne(body);
  return query;
};

export { connect, createUser, getUsers, getUserbyID, updateUser };
