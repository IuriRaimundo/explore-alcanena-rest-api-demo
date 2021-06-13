const validate = require('../middleware/validate');
const getDocs = require('../middleware/getDocs.js');
const updateDoc = require('../middleware/updateDoc.js');
const createDoc = require('../middleware/createDoc.js');
const deleteDoc = require('../middleware/deleteDoc.js');
const express = require('express');
const router = express.Router();

router.get('/:collection', getDocs);

router.post('/:collection', validate, createDoc);

router.put('/:collection', validate, updateDoc);

router.delete('/:collection', deleteDoc);

module.exports = router;
