module.exports = function(sequelize, DataTypes) {
    var Name = sequelize.define("Name", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    Name.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Name.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return Name;
  };
  