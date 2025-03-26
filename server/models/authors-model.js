const sequelize = require('./db-connect')
const  {DataTypes}  = require ("sequelize");

const Authors = sequelize.define('authors',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    job:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    online:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports = Authors;