const express = require('express')
const router = express.Router()
const Material = require('../models/materials')
const Category = require('../models/category')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/', async (req, res) => {
  try {
    const materials = await Material.find().populate('category')
    res.render('materials/index.ejs', { materials })
  } catch (err) {
    console.error(err)
    res.redirect('/')
  }
});


router.get('/new', isSignedIn, async (req, res) => {
  try {
    const categories = await Category.find()
    res.render('materials/new.ejs', { categories })
  } catch (err) {
    console.error(err)
    res.redirect('/materials')
  }
});


module.exports = router