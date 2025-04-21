const bcrypt = require('bcrypt');
const { User } = require('../models');

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  try {
    await User.create({
      name: 'Admin',
      phone_number: '000000000',
      email: 'admin@example.com',
      img: null,
      bi: '0000000000AA000',
      access_level: 'admin',
      password: hashedPassword
    });

    console.log('Usuário admin criado com sucesso!');
  } catch (err) {
    console.error('Erro ao criar usuário admin:', err);
  }
}

seedAdmin();
