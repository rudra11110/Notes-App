import sequelize from '../config/sequelize.js';
import User from '../models/User.js';
import Note from '../models/Note.js';
import bcrypt from 'bcryptjs';
const seed = async () => {
  await sequelize.sync({ force: true });
  const password = await bcrypt.hash('demo1234', 10);
  const user = await User.create({ name: 'Demo User', email: 'demo@example.com', password });
  await Note.bulkCreate([
    { title: 'Welcome Note', content: 'This is your first note!', userId: user.id },
    { title: 'Todo', content: 'Build Notes App UI', userId: user.id },
    { title: 'Reminder', content: 'Drink Water', userId: user.id }
  ]);
  console.log('Seed completed.');
  process.exit();
};
seed();
