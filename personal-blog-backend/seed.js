const mongoose = require('mongoose');

const dotenv = require('dotenv');

const User = require('./models/userModel');


dotenv.config();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'YourStrongPassword123!';

// 4. THE MAIN SEEDING FUNCTION
const seedAdmin = async () => {
  try {
   
    console.log('Connecting to database...');
    // Make sure your .env has MONGODB_URI defined
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully.');

    // 6. CHECK IF THE ADMIN USER ALREADY EXISTS
    // This makes our script "idempotent" - meaning you can run it multiple times
    // without creating duplicate users.
    // const existingAdmin = await User.findOne({ username: ADMIN_USERNAME });

    // if (existingAdmin) {
    //   console.log('Admin user already exists. NO Action taken');
    //   return;
    // }

    // 7. CREATE AND SAVE THE NEW ADMIN USER
    // If the admin user doesn't exist, we create a new one.
    // console.log('Admin user not found. Creating a new one...');
    const adminUser = new User({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD, // We provide the plain-text password here.
      role: 'admin',
      email: 'staraman600@gmail.com',
    });

    await adminUser.save();

    console.log('----------------------------------------------------');
    console.log('Admin user created successfully!');
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log('You can now use these credentials to log in.');
    console.log('----------------------------------------------------');

  } catch (error) {
    // If any error occurs, we log it to the console.
    console.error('Error during admin user seeding:', error);
  } finally {
    // 8. DISCONNECT FROM THE DATABASE
    // This is a crucial step. Whether the script succeeds or fails,
    // we must close the connection to the database to prevent hanging processes.
    console.log('Disconnecting from database...');
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

// 9. EXECUTE THE SEEDING FUNCTION
seedAdmin();