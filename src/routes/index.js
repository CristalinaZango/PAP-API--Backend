const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/auth');


const companyController = require('../controllers/companyController');
const serviceController = require('../controllers/serviceController');
const userController = require('../controllers/userController');
const logController = require('../controllers/logController');
const authController = require('../controllers/authController');

// Rotas públicas
router.post('/login', authController.login);

// Proteger tudo abaixo
router.use(authMiddleware);

//////////////////// USERS ////////////////////
const upload_user = multer({ dest: 'public/imgs/users' });
router.get('/users', userController.index);
router.post('/users', upload_user.single('img'), userController.store);
router.put('/users/:id', upload_user.single('img'), userController.update);
router.get('/users/:id', userController.show);
router.get('/users/name/:name', userController.showByName);
router.delete('/users/:id', userController.destroy);

//////////////////// COMPANIES ////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

router.get('/companies', companyController.getAllCompanies);
router.get('/companies/:id', companyController.getCompanyById);
router.get('/companies/name/:name', companyController.getCompaniesByName);
router.post('/companies', upload.single('img'), companyController.createCompany);
router.put('/companies/:id', upload.single('img'), companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

//////////////////// SERVICES ////////////////////
router.get('/services/recent', serviceController.getMostRecent);
router.get('/services/most-searched', serviceController.getMostSearched);
router.get('/services/name/:name', serviceController.getByName);

router.get('/services/:id', serviceController.getById); // <-- DEVE vir por último
router.get('/services', serviceController.getAll);
router.post('/services', serviceController.create);
router.put('/services/:id', serviceController.update);
router.delete('/services/:id', serviceController.delete);


//////////////////// LOGS ////////////////////
router.get('/logs', logController.getAllLogs); 
router.get('/logs/:id', logController.getLogById); 


module.exports = router;
