module.exports = (sequelize, DataTypes) => {
    const token = sequelize.define("token", {
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_id: {
        type: DataTypes.BIGINT,
        validate: {
          notEmpty : true,
        }
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: "1",
      },
    });
   
    return token;
  };
  