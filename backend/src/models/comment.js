import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentId: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique ID
    description: { type: String, required: true }, // Comment content
    response: { type: String, default: "" }, // Optional response
    rating: { type: String }, // Rating
    createdAt: { type: Date, default: Date.now } // Timestamp
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;