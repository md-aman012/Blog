const slugify = require('slugify')
const mongoose  = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'A post must have title'],
        trim: true
    },
    markdownContent :{
        type: String,
        required:[true, 'A post must have content']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'A blog post must have author'],
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true,
    }
    // category: {
    //     type: String,
    //     required: [true,"Please Provide blog category"],
    //     default: 'tech'
    // }

});

postSchema.pre('save', async function() {
   if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
   }
})



// Create and export the Mongoose Model.
// The mongoose.model() function compiles the schema into a usable model.
// It takes two arguments:
// - The singular name of the model as a string ('Post'). Mongoose will automatically look for
//   the plural, lowercased version of this name for the collection in the database (i.e., 'posts').
// - The schema to use (postSchema).
// We then use `module.exports` to make this Post model available to other files in our application,
// specifically our controllers.

const Post = mongoose.model('Post', postSchema);
module.exports = Post;


