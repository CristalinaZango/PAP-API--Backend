const { Log } = require('../models');

exports.createLog = async ({ user, action, entity, entityId, message }) => {
  try {
    await Log.create({
      user,
      action,
      entity,
      entityId,
      message
    });
  } catch (err) {
    console.error('Erro ao criar log:', err.message);
  }
};
