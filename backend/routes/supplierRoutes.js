    // backend/routes/supplierRoutes.js
    const express = require('express');
    const router = express.Router();
    const supplierController = require('../controllers/supplierController');

    // Ruta POST
    router.post('/', supplierController.createSupplier);

    module.exports = router;
    
