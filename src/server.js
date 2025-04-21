const app = require('./app');
require('dotenv').config();
const sequelize = require('./config/database'); // 👈 adiciona isso aqui!

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('📦 Tabelas sincronizadas com sucesso.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  });
