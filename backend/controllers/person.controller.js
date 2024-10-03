const {tmdbApi} = require('../Tmdb/tmdb.api')

async function personDetail(req,res){
    try{
          const {personId} = req.params;
          const person = await tmdbApi.personDetail({personId});

          res.status(200).json({person})
    }catch(e){
       console.error(e)
    }
}

async function personMedias(req,res){
    try{
    const {personId} = req.params;

    const medias = await tmdbApi.personMedias({personId});
    res.status(200).json({medias})
    }catch(e){
        console.error(e)
    }
}

module.exports={
    personMedias,personDetail
}