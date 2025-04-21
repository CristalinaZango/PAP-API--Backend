const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createLog } = require('../utils/logHelper');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: 'Senha incorreta' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'segredo', {
        expiresIn: '1d',
      });

      await createLog({
        user: user.email,
        action: 'LOGIN',
        entity: 'User',
        entityId: user.id,
        message: 'Usuário logou com sucesso',
      });

      res.json({ token });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro no servidor' });
    }
  }
};
