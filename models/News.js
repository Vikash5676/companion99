const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image_url: { type: String },
    video_link: { type: String },
    like_count: { type: Number },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    category: { type: Number, required: true },
    redirect: { type: String },
    button_text: { type: String },
    button_link: { type: String },
    s3_url: { type: String, required: true },
    is_deleted: { type: Number, default: 1, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const News = mongoose.model('News', NewsSchema);
module.exports = News