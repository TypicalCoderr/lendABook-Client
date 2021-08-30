module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    });

    return Users;
}