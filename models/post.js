module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your initials'
        },
        len: [1, 2]
      },
      primaryKey: true
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
  });
  
  return Post;

  var Reply = sequelize.define("Reply", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 2]
      },
      references: "posts",
      referencesKey: "id",
    },    
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },    
  });
  return Reply;

  Post.hasMany(reply); // Set one to many relationship 
  
};






