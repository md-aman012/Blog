const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/postModel');

dotenv.config();

const fixAuthorIds = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected.');

    const posts = await Post.find({ author: { $type: 'string' } }).select('_id author');
    if (posts.length === 0) {
      console.log('No posts with string author ids found.');
      return;
    }

    let updatedCount = 0;
    for (const post of posts) {
      const authorId = post.author;
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        console.warn(`Skipping post ${post._id}: invalid ObjectId "${authorId}"`);
        continue;
      }
      await Post.updateOne(
        { _id: post._id },
        { $set: { author: new mongoose.Types.ObjectId(authorId) } }
      );
      updatedCount += 1;
    }

    console.log(`Updated ${updatedCount} post(s).`);
  } catch (error) {
    console.error('Error fixing author ids:', error);
  } finally {
    console.log('Disconnecting from database...');
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

fixAuthorIds();
