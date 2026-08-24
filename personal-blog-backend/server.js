require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Assuming you'll add/have cors


const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

const whitelist = [process.env.FRONTEND_URL,"https://blog-z893.onrender.com","https://blog-ten-alpha-58.vercel.app/"];

// const corsOptions = {
//   origin: (origin,callback) => {
//     if(whitelist.indexOf(origin) !== -1 || !origin){
//       callback(null,true)
//     }else{
//       callback(new Error('Not Allowed by cors'))
//     }
//   },
//   optionsSuccessStatus : 200
// }

app.use(cors());
app.use(express.json());

// 4. Define the port
const PORT = process.env.PORT || 5000;

app.use('/api/posts', postRoutes);
// Auth routes: POST /api/auth/login
app.use('/api/auth', authRoutes); 

// 5. Create a function to connect to DB and start the server
const startServer = async () => {
  // ... (rest of your existing startServer function remains unchanged)
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Successfully connected to MongoDB!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

// 6. Call the function to start the server
startServer(); 