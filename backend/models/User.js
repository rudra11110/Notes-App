import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
}, { timestamps: true });
export default User;
