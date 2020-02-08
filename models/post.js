module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your initials'
        },
        min:2,
        max: 2
      },
    },
    topic: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1, 40]
      }
    },
    body: {
      type: DataTypes.TEXT,
      notNull: true,
      validate: {
        len: [1, 255]
      }
    }},  
  {  
    freezeTableName: true,
  });  

Post.associate = function(models) {
    // Associating replies with Posts
Post.hasMany(models.Reply);
  };
  return Post;
};



