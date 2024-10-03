const {tmdbApi} = require('../Tmdb/tmdb.api');
const {userModel,favouriteModel,reviewModel} = require('../database/db');
const {usermiddleware} = require('../middleware/usermiddleware');

async function getList(req,res){
    try{
     const {page} = req.query;
     const{mediaType,mediaCategory}= req.params;

     const response = await tmdbApi.mediaList({mediaType,mediaCategory,page});

     return res.status(200).json({message:"Here is your list",response})
    }catch(e){
     console.error(e)
    }
}

async function getGenres(req,res){
    try{
     const {mediaType} = req.params;

     const response = await tmdbApi.mediaGenres({mediaType});

     return res.status(200).json({message:"all okay",response});
    }catch(e){
      console.log(e)
    }
}

async function serach(req,res){
    try{
       const {mediaType} = req.params;
       const{query,page}=req.query;

       const response = await tmdbApi.mediaSearch({
        query,
        page,
        mediaType:mediaType=== "people" ? "person" : mediaType
       });

       return res.status(200).json({response})
    }catch(e){
        console.log(e)
    }
}

async function getDetail(req,res){
    try{
        const userId = req.userId
        const { mediaType, mediaId } = req.params;
        const params ={mediaType,mediaId};

        const media = await tmdbApi.mediaDetail(params);
        media.credits = await tmdbApi.mediaCredits(params);
       
        const videos = await tmdbApi.mediaVideos(params);
        media.videos = videos;

        const recommend = await tmdbApi.mediaRecommend(params);
        media.recommend = recommend.results;

        media.images = await tmdbApi.mediaImages(params);

        if(userId){
            const user = await favouriteModel.findOne({user:user.id,mediaId});
            if(user){
                const isFavourite = await favouriteModel.findOne({user:user.id,mediaId});
                media.isFavourite = isFavourite !== null
            }
        }

        media.reviews = await reviewModel.find({mediaId}).populate('user').sort('-createdAt');

        res.status(200).json({message:"Here are media",media})


    }catch(e){
        console.error(e)
    }
}