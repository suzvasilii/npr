const express = require('express')
const app = express();
const multer = require('multer')
const upload = multer()

const cors = require('cors')
const sequelize = require("./models/db-connect")
const authorsRouter = require("./routers/authors-router")
const projectsRouter = require("./routers/projects-router")
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(upload.array())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/api/authors", authorsRouter);
app.use("/api/projects", projectsRouter);

async function start(){
    try{
        await sequelize.authenticate()
        console.log("Соединение с БД было успешно установлено")
        app.listen(5000, ()=>console.log("Сервер запущен на 5000 порте"));
    }catch (e){
        console.log("Возникла непредвиденная ошибка:")
        console.log(e)
    }
}

start();
