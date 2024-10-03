const {reviewModel} = require('../database/db');

async function create(req,res){
    try{
       
       const {movieId} = req.params;

       const review = new reviewModel({
        user: req.user.id,
        movieId,
        ...req.body
    })

    await review.save();

    res.status(200).json({
        ...review._doc,
        id: review.id,
        user: req.user
    })

    }catch(e){
        console.error(e)
    }
}

