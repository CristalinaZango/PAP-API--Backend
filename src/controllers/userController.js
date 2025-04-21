const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createLog } = require('../utils/logHelper');

module.exports = {

  // Criar novo utilizador
async store(req, res) {
  const {
    name,
    phone_number,
    email,
    bi,
    access_level,
    password,
  } = req.body;

  const img = req.file ? req.file.filename : null;

  try {
    // Verifica se já existe um utilizador com o mesmo email
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email já está em uso.' });
    }

    // Verifica se já existe um utilizador com o mesmo BI
    const existingBI = await User.findOne({ where: { bi } });
    if (existingBI) {
      return res.status(400).json({ error: 'BI já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phone_number,
      email,
      img,
      bi,
      access_level,
      password: hashedPassword,
    });

    await createLog({
      user: 'admin',
      action: 'CREATE',
      entity: 'User',
      entityId: newUser.id,
      message: `Utilizador criado: ${name} (${email})`,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
},

  // Atualizar utilizador
async update(req, res) {
  try {
    const { id } = req.params;
    const { name, phone_number, email, bi, access_level } = req.body;
    const img = req.file ? req.file.filename : null;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });

    // Verifica se o novo email já está em uso por outro usuário
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== user.id) {
        return res.status(400).json({ error: 'Email já está em uso por outro utilizador.' });
      }
    }

    // Verifica se o novo BI já está em uso por outro usuário
    if (bi && bi !== user.bi) {
      const existingBI = await User.findOne({ where: { bi } });
      if (existingBI && existingBI.id !== user.id) {
        return res.status(400).json({ error: 'BI já está em uso por outro utilizador.' });
      }
    }

    await user.update({
      name,
      phone_number,
      email,
      bi,
      access_level,
      ...(img && { img })
    });

    await createLog({
      user: 'admin',
      action: 'UPDATE',
      entity: 'User',
      entityId: id,
      message: `Utilizador atualizado: ${name} (${email})`,
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar utilizador.', details: err });
  }
},

  // Listar todos os utilizadores
  async index(req, res) {
    try {
      const users = await User.findAll();
      
    
      await createLog({
        user: 'admin',  // Ou pegar o usuário autenticado, se aplicável
        action: 'LIST',
        entity: 'User',
        entityId: null,
        message: 'Todos os usuários foram listados.',
      });
      
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar utilizadores.', details: err });
    }
  },

  //Listar utilizador por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });

      await createLog({
        user: 'admin',
        action: 'SHOW',
        entity: 'User',
        entityId: id,
        message: `Utilizador consultado: ${user.name} (${user.email})`,
      });

      res.json(user);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao consultar utilizador.', details: err });
    }
  },

  //Listar utilizador por nome
  async showByName(req, res) {
    try {
      const { name } = req.params;
      const user = await User.findAll({ where: { name } });
      if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });

      await createLog({
        user: 'admin',
        action: 'SHOW',
        entity: 'User',
        entityId: null,
        message: `Utilizador consultado por nome: ${name}`,
      });

      res.json(user);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao consultar utilizador.', details: err });
    }
  },

  // Remover utilizador
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });

      await user.destroy();

      await createLog({
        user: 'admin',
        action: 'DELETE',
        entity: 'User',
        entityId: id,
        message: `Utilizador removido: ${user.name} (${user.email})`,
      });

      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: 'Erro ao remover utilizador.', details: err });
    }
  }
};
