module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define(
    'Period',
    {
      name: DataTypes.STRING,
      year: DataTypes.DATE,
    },
    {},
  );
  Period.associate = models => {
    Period.hasMany(models.Module, {
      foreignKey: 'id',
    });
  };
  return Period;
};
