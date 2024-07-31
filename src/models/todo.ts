import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import User from './user';

interface TodoAttributes {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'todos',
    sequelize,
  }
);

Todo.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

export default Todo;
