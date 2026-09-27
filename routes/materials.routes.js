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


router.post('/', isSignedIn, async (req, res) => {
  try {
    await Material.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      unit: req.body.unit,
      createdBy: req.session.user._id
    })
    res.redirect('/materials')
  } catch (err) {
    console.error(err)
    res.redirect('/materials/new')
  }
});

//showing single material details
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('category createdBy')
    res.render('materials/show.ejs', { material })
  } catch (err) {
    console.error(err)
    res.redirect('/materials')
  }
});


router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)

    // Verify creator authorization
    if (material.createdBy && material.createdBy.toString() !== req.session.user._id.toString()) {
      return res.redirect(`/materials/${req.params.id}`)
    }

    const categories = await Category.find();
    res.render('materials/edit.ejs', { material, categories })
  } catch (err) {
    console.error(err)
    res.redirect('/materials')
  }
});

module.exports = router