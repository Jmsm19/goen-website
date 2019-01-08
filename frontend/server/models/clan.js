module.exports = (sequelize, DataTypes) => {
  const Clan = sequelize.define(
    'Clan',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  Clan.associate = models => {
    Clan.hasMany(models.User, {
      foreignKey: 'id',
    });
  };
  return Clan;
};
