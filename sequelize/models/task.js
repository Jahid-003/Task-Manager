module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define("task", {
    task_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    priority: {
      type: DataTypes.BIGINT,
      validate: { 
        notEmpty: true
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      validate: {
        notEmpty : true,
      }
    },
    status: {
      type: DataTypes.ENUM('Todo', 'In Progress', 'Completed'), 
      defaultValue: 'Todo',
      allowNull: false,
  },
  });
 
  return task;
};
