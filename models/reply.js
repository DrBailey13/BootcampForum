module.exports = function (sequelize, DataTypes) {
  var Reply = sequelize.define("Reply", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    post_id: {
    type: DataTypes.UUID,
    notNull: true
    },
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
        notNull: true,
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
      Reply.belongsTo(models.Post);
    };
  
    return Reply;
  };