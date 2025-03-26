const sequelize = require('./db-connect');
const {DataTypes} = require("sequelize");

const Projects = sequelize.define('projects',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    ownerId:{
        type:DataTypes.INTEGER,
        references:{model:'authors', key:'id'},
        allowNull: false
    },
    owner:{
      type:DataTypes.STRING,
      allowNull:false
    },
    company_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    budget:{
        type:DataTypes.NUMBER,
        allowNull:false,
    },
    completion:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
});

module.exports = Projects;