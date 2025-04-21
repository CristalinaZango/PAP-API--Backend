const Service = require('../models/Service'); 
const { Op } = require('sequelize');
const multer = require('multer');
const { createLog } = require('../utils/logHelper');


// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório para armazenar os arquivos
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Nome único para evitar conflitos
  },
});

const upload = multer({ storage: storage });

// Buscar todos os serviços
exports.getAll = async (req, res) => {
  try {
    const services = await Service.findAll();

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Service',
      entityId: null,
      message: 'Listagem de todos os serviços.',
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
};

// Buscar serviço por ID
exports.getById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });

    // Incrementar o search_count
    service.search_count = (service.search_count || 0) + 1;
    await service.save();

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Service',
      entityId: service.id,
      message: 'Busca de serviço por ID.',
    });

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o serviço' });
    console.log('Erro ao buscar o serviço:', error);
  }
};

// Buscar serviços por nome
exports.getByName = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: {
        service_name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    });

    if (services.length === 0) return res.status(404).json({ error: 'Nenhum serviço encontrado' });

    // Incrementar o search_count de cada serviço encontrado
    await Promise.all(services.map(service => {
      service.search_count = (service.search_count || 0) + 1;
      return service.save();
    }));

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Service',
      entityId: null,
      message: `Busca por nome de serviço: "${req.params.name}"`,
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviços' });
    console.log('Erro ao buscar serviços:', error);
  }
};

exports.create = async (req, res) => {
  try {
    // Middleware multer para processar os arquivos
    upload.fields([{ name: 'service_img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Erro no upload de arquivos', details: err.message });
      }

      // Pegar os arquivos enviados
      const serviceImg = req.files['service_img'] ? req.files['service_img'][0].path : null;
      const pdf = req.files['pdf'] ? req.files['pdf'][0].path : null;

      // Criar o serviço
      const service = await Service.create({
        service_name: req.body.service_name,
        service_img: serviceImg,
        company_id: req.body.company_id,
        status: req.body.status,
        description: req.body.description,
        price: req.body.price,
        tempo_processamento: req.body.tempo_processamento,
        pdf: pdf,
        open_closed: req.body.open_closed,
      });

      // Criar log da ação
      await createLog({
        user: 'admin',
        action: 'CREATE',
        entity: 'Service',
        entityId: service.id,
        message: `Serviço criado: ${service.service_name}`,
      });

      res.status(201).json(service);
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar serviço', details: error.message });
  }
};

// Atualizar serviço com upload de arquivos
exports.update = async (req, res) => {
  try {
    // Middleware multer para processar os arquivos
    upload.fields([{ name: 'service_img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Erro no upload de arquivos', details: err.message });
      }

      // Procurar o serviço
      const service = await Service.findByPk(req.params.id);
      if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });

      // Atualizar os campos de arquivos se eles estiverem presentes
      const serviceImg = req.files['service_img'] ? req.files['service_img'][0].path : service.service_img;
      const pdf = req.files['pdf'] ? req.files['pdf'][0].path : service.pdf;

      // Atualizar os dados do serviço
      await service.update({
        service_name: req.body.service_name || service.service_name,
        service_img: serviceImg,
        company_id: req.body.company_id || service.company_id,
        status: req.body.status || service.status,
        description: req.body.description || service.description,
        price: req.body.price || service.price,
        tempo_processamento: req.body.tempo_processamento || service.tempo_processamento,
        pdf: pdf,
        open_closed: req.body.open_closed || service.open_closed,
      });

      // Criar log da ação
      await createLog({
        user: 'admin',
        action: 'UPDATE',
        entity: 'Service',
        entityId: service.id,
        message: `Serviço atualizado: ${JSON.stringify(req.body)}`,
      });

      res.json(service);
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar serviço', details: error.message });
  }
};

// Deletar serviço
exports.delete = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });

    await service.destroy();

    await createLog({
      user: 'admin',
      action: 'DELETE',
      entity: 'Service',
      entityId: service.id,
      message: `Serviço deletado.`,
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
};

// Buscar serviços mais procurados
exports.getMostSearched = async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [['search_count', 'DESC']],
      limit: 10,
    });

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Service',
      entityId: null,
      message: 'Listagem dos serviços mais procurados.',
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviços mais procurados' });
    console.error('Erro ao buscar serviços mais procurados:', error);
  }
};

// Buscar serviços mais recentes
exports.getMostRecent = async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Service',
      entityId: null,
      message: 'Listagem dos serviços mais recentes.',
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviços mais recentes' });
  }
};
