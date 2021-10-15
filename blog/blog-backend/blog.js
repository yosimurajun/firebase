import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    type: String,
    title: String,
    content: String,
    writer: String,
    date: {
        type: Date, 
        default: Date.now
    }
})

export default mongoose.model('blog', blogSchema);