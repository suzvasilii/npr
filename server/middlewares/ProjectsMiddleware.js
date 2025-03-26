const apiError = require("../errors/ApiErrors");
const authorModel = require('../models/authors-model')

class ProjectsMiddleware {

    static async addProject(req, res, next){
        const {ownerId, company_name, budget, completion} = req.body;
        if (ownerId && company_name && budget && completion){
            const author = await authorModel.findOne({where:{id:ownerId}});
            if (author){
                req.body.owner = author.name;
                next();
            } else {
                return res.status(400).json({response:apiError.badRequest("Такого автора нет в базе данных.")})
            }
        } else {
            console.log(req.body)
            return res.status(400).json({response:apiError.badRequest()})
        }
    }

    static async updateProject(req,res,next){
        const {id, budget, completion} = req.body
        if (req.body.id){
            if(budget && completion){
                const author = await authorModel.findOne({where:{id:req.body.ownerId}})
                if (author){
                    req.body.owner = author.name
                    next()
                }
            } else {
                return res.status(400).json({response:apiError.badRequest()})
            }
        }else {
            return res.status(400).json({response:apiError.badRequest("для обновления необходимо передать id")})
        }
    }

    static delProject(req,res,next){
        const {id} = req.params;
        if (id){
            console.log(id, "Тупой юзер")
            next();
        } else {
            return res.status(400).json({response:apiError.badRequest("Не был передан id проекта")})
        }
    }

}

module.exports = ProjectsMiddleware;