// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';


const USER_CLASS = 'User';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}


/**
 * Define the schema
 */
const userSchema = mongoose.Schema({
    // TODO: Define the schema to represent users
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
    const user = new User({ name: name, age: age, email: email, phoneNumber: phoneNumber });
    // Call save to persist this object as a document in MongoDB
    return user.save();
}


export { connect, createUser };
