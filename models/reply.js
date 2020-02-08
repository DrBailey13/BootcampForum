module.exports = function (sequelize, DataTypes) {
    var Reply = sequelize.define("Reply", {
       name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            min: 2,
            max: 2
          },
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
        }
    
      );
    
       Reply.associate = function(models) {
        // We're saying that a replies should belong to an post
        // Replies can't be created without an Post due to the foreign key constraint
        Reply.belongsTo(models.Post, {
          foreignKey: {
            // PostID
            allowNull: false, 
          }
        });
      };
    
      return Reply;
    };