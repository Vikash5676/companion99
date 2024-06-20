const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    news: {
        type: Schema.Types.ObjectId, ref: 'News', required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment