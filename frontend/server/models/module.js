module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      name: DataTypes.STRING,
      periodId: DataTypes.INTEGER,
    },
    {},
  );
  Module.associate = models => {
    Module.belongsTo(models.Period, {
      allowNull: true,
    });
  };
  return Module;
};
