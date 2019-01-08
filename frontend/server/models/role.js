module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: 'RoleUser',
      onDelete: 'CASCADE',
    });
  };
  return Role;
};
