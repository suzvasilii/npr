const projectModel  = require("../models/projects-model")
const sequelize = require("../models/db-connect")
const apiError = require('../errors/ApiErrors')

class ProjectsController{

    async addProject(req,res){
        try {
            const candidate = await sequelize.query(`SELECT * FROM projects WHERE company_name='${req.body.company_name}'`);
            if (candidate[1].rowCount === 0){
                const newProject = await projectModel.create({...req.body});
                if (newProject){
                    return res.status(200).json({response:"Проект был добавлен в базу данных."})
                }
            } else {
                return res.status(400).json({response:apiError.badRequest("Проект с такой компанией уже существует в базе данных.")});
            }
        }catch (e){
            console.log(e);
            return res.status(500).json({response:apiError.internalError()})
        }
    }

    async getProject(req,res){
        try{
            const {id} = req.params;
            const query = await sequelize.query(`SELECT * FROM projects WHERE id='${id}'`);
            if (query[1].rowCount > 0){
                return res.status(200).json({response:query});
            } else return res.status(400).json({response:apiError.badRequest("Проекта с таким id не существует в базе данных.")});
        } catch (e){
            console.log(e);
            return res.status(500).json({response:apiError.internalError()})
        }

    }

    async getProjects(req,res){
        try{
            const projects = await projectModel.findAll();
            if (projects.length > 0){
                return res.status(200).json({response:projects});
            } else {
                return res.status(400).json({response:apiError.badRequest("Проекты не найдены")});
            }
        } catch(e){
            console.log(e);
            return res.status(500).json({response:apiError.internalError()})
        }
    }

    async updateProject(req,res){
        try{
            const author = await projectModel.update({...req.body}, {where:{id:req.body.id}});
            if (author){
                return res.status(200).json({response:"Информация о проекте обновлена."})
            } else return res.status(400).json({response:"Не удалось обновить информацию о пользователе."})
        }catch(e){
            console.log(e);
            return res.status(500).json({response:apiError.internalError()})
        }
    }

    async delProject(req,res){
        try{
            const {id} = req.params;
            console.log(id)
            const query = await sequelize.query(`DELETE FROM projects WHERE id='${id}'`);
            if (query[1].rowCount > 0){
                return res.status(200).json({response:"Проект был удален из базы данных"});
            }else {
                return res.status(400).json({response:apiError.badRequest()});
            }
        }catch (e){
            console.log(e);
            return res.status(500).json({response:apiError.internalError()})
        }
    }
}

module.exports = new ProjectsController()