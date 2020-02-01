module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 25]
        }
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,40]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1,255]
        }
      },      
    });
    return Post;

    Post.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Post.belongsTo(models.Name, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };


  