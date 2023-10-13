module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    isMale: {
      type: Sequelize.BOOLEAN,
    },
  });
  return User;
};
