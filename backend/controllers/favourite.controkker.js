const { date } = require('zod');
const {favouriteModel} = require('../database/db');

async function addFavorite(req,res){
    try{

        const user = req.userId
        const mediaId = req.body.mediaId
        const isFavourite = await favouriteModel.findOne({
           user,
           mediaId
        })

        if(isFavourite){
            return res.status(200).json({message:"success",data:isFavourite});
        }

        const favorite = new favouriteModel({
            ...req.body,
            user
        })

        await favorite.save();
        res.status(201).json({message:"Success",date:favorite});
    }catch(e){
        console.error(e)
        res.status(500).json({status:"error",message:"An error occurred"})
    }
}

async function removeFavorite(req,res){
    try{
        const userId = req.userId
     const {favoriteId}= req.params;
     const favourite = await favouriteModel.findOne({
        user,
        _id:favoriteId,
     })

     if(!favourite){
        return res.status(404).json({staus:'error',message:'Favourite not found'});
     }
     await favourite.remove();

     res.status(200).json({ status: "success", message: "Favorite removed successfully" });
    }catch(e){
        console.error(e)
    }
}

async function getFavoritesOfUser(req,res) {
    try{
     const favourite = await favouriteModel.find({user}).sort("-createdAt");

   res.status(200).json({ status: "success", data: favourite});
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

module.exports={
    addFavorite,removeFavorite,getFavoritesOfUser
}