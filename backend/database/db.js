const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, 
}, {
    timestamps: true, 
});

const userModel = mongoose.model('User', userSchema);


const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    mediaType: { type: String, enum: ['tv', 'movie'], required: true },
    mediaId: { type: String, required: true },
    mediaTitle: { type: String, required: true },
    mediaPoster: { type: String, required: true },
}, {
    timestamps: true, 
});

const reviewModel = mongoose.model('Review', reviewSchema);


const favouriteSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    mediaType: { type: String, enum: ['tv', 'movie'], required: true },
    mediaId: { type: String, required: true },
    mediaTitle: { type: String, required: true },
    mediaPoster: { type: String, required: true },
    mediaRate: { type: Number, required: true }, 
}, {
    timestamps: true, 
});

const favouriteModel = mongoose.model('Favourite', favouriteSchema);


const mediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['tv', 'movie'], required: true },
    releaseDate: { type: Date, required: true },
    description: { type: String },
    poster: { type: String },
    genre: [String],
}, {
    timestamps: true,
});

const mediaModel = mongoose.model('Media', mediaSchema);


module.exports = {
    userModel,
    reviewModel,
    favouriteModel,
    mediaModel,
};
