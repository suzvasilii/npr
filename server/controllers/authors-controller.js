const authorModel  = require("../models/authors-model")
const apiError = require('../errors/ApiErrors')

class AuthorsController{

    async getAuthors(req,res){
        const {limit, offset} = req.query;
        try{
            const authors = await authorModel.findAll({limit, offset});
            if (authors.length > 0){
                return res.status(200).json({response:authors});
            } else {
                return res.status(200).json({response:"В базе данных ничего не найдено"});
            }
        } catch(e){
            console.log(e, limit, offset);
            return res.status(500).json({response:apiError.internalError()})
        }
    }

}

module.exports = new AuthorsController()