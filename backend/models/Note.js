import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';
const Note = sequelize.define('Note', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { timestamps: true });
Note.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Note, { foreignKey: 'userId' });
export default Note;
