module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      nationalId: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      emailVerifiedAt: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      active: DataTypes.BOOLEAN,
      activationToken: DataTypes.STRING,
      clanId: DataTypes.INTEGER,
    },
    {
      // Add date to deletedAt when user is "deleted"
      paranoid: true,
    },
  );
  User.associate = models => {
    User.belongsTo(models.Clan, {
      allowNull: true,
    });
    User.belongsToMany(models.Role, {
      through: 'RoleUser',
    });
  };
  return User;
};
