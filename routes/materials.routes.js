const express = require('express')
const router = express.Router()
const Material = require('../models/materials')

router.get('/', async (req, res) => {
  try {
    const materials = await Material.find().populate('category')
    res.render('materials/index.ejs', { materials })
  } catch (err) {
    console.error(err)
    res.redirect('/')
  }
});

module.exports = router