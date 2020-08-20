module.exports = function(sequelize, DataTypes) {
  const oldShows = sequelize.define("oldShows", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    oldShowID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  oldShows.associate = models => {
    oldShows.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return oldShows;
};
