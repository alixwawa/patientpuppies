module.exports = function(sequelize, DataTypes) {
  const Oldshows = sequelize.define("Oldshows", {
    oldShowID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Oldshows.associate = models => {
    Oldshows.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Oldshows;
};
