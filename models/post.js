module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {

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

// have an associated id for each post/reply, new link continueing to display post with replies attached.





