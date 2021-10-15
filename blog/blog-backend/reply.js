import mongoose from 'mongoose';

const replySchema = mongoose.Schema({
    content_id: String,
    replyer: String,
    content: String,
    date: {
        type: Date, 
        default: Date.now
    }
})

export default mongoose.model('reply', replySchema);