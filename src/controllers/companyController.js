const Company = require('../models/Company');
const { Op } = require('sequelize');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { createLog } = require('../utils/logHelper');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Company',
      entityId: null,
      message: 'Listagem de todas as empresas.',
    });

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresas.' });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const {
      company_name,
      company_email,
      company_phone_number,
      status,
      description,
      type,
      website,
      fb,
      insta,
      x
    } = req.body;

    const img = req.file ? req.file.filename : null;

    const company = await Company.create({
      company_name,
      company_email,
      company_phone_number,
      status,
      description,
      type,
      website,
      fb,
      insta,
      x,
      img
    });

    await createLog({
      user: 'admin',
      action: 'CREATE',
      entity: 'Company',
      entityId: company.id,
      message: `Empresa ${company.company_name} criada.`,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar empresa.' });
    console.error('Erro ao cadastrar empresa:', error);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.img = req.file.filename;
    }

    const [updated] = await Company.update(updatedData, { where: { id } });

    if (updated) {
      await createLog({
        user: 'admin',
        action: 'UPDATE',
        entity: 'Company',
        entityId: id,
        message: `Empresa atualizada: ${JSON.stringify(updatedData)}`,
      });

      const updatedCompany = await Company.findByPk(id);
      res.status(200).json(updatedCompany);
    } else {
      res.status(404).json({ error: 'Empresa não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar empresa.' });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Company.destroy({ where: { id } });

    if (deleted) {
      await createLog({
        user: 'admin',
        action: 'DELETE',
        entity: 'Company',
        entityId: id,
        message: `Empresa deletada.`,
      });

      res.status(200).json({ message: 'Empresa removida com sucesso.' });
    } else {
      res.status(404).json({ error: 'Empresa não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover empresa.' });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (company) {
      await createLog({
        user: 'admin',
        action: 'READ',
        entity: 'Company',
        entityId: id,
        message: `Empresa buscada por ID.`,
      });

      res.status(200).json(company);
    } else {
      res.status(404).json({ error: 'Empresa não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresa.' });
  }
};

exports.getCompaniesByName = async (req, res) => {
  try {
    const { name } = req.params;
    const companies = await Company.findAll({
      where: {
        company_name: {
          [Op.like]: `%${name}%`
        }
      }
    });

    await createLog({
      user: 'admin',
      action: 'READ',
      entity: 'Company',
      entityId: null,
      message: `Buscando empresas com nome parecido com "${name}".`,
    });

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresas.' });
  }
};
