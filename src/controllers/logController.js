const Log = require('../models/Log'); 
const { Op } = require('sequelize');

// Listar todos os logs (ordenados do mais recente ao mais antigo)
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar logs', details: err });
  }
};

// Buscar log por ID
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log não encontrado' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar log', details: err });
  }
};
