const express = require('express')
const router = express.Router()
const Material = require('../models/materials')
const Category = require('../models/category')
const isSignedIn = require('../middleware/is-signed-in')
const isAdmin = require('../middleware/is-admin')

router.get('/', async (req, res) => {
  try {
    const materials = await Material.find().populate('category')
    res.render('materials/index.ejs', { materials })
  } catch (err) {
    console.error(err)
    res.redirect('/')
  }
});


router.get('/new', isSignedIn, isAdmin, async (req, res) => {
  try {
    const categories = await Category.find()
    res.render('materials/new.ejs', { categories })
  } catch (err) {
    console.error(err)
    res.redirect('/materials')
  }
});


router.post('/', isSignedIn, isAdmin , async (req, res) => {
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


router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('category createdBy')
    res.render('materials/show.ejs', { material })
  } catch (err) {
    console.error(err)
    res.redirect('/materials')
  }
});


router.get('/:id/edit', isSignedIn, isAdmin , async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
    const categories = await Category.find()
    if (!material.createdBy.equals(req.session.user._id)) {
        return res.redirect('/entries')
    }
    res.render('materials/edit.ejs', { material, categories })
  } catch (err) {
    console.error(err)
    res.redirect('/materials')
  }
});


router.put('/:id', isSignedIn, isAdmin , async (req, res) => {
  try {
    await Material.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      unit: req.body.unit
    });

    res.redirect('/materials')
  } catch (err) {
    console.error(err)
    console.log('edit is not working')
  }
});


router.delete('/:id', isSignedIn, isAdmin, async (req, res) => {
    try {
        await Material.findByIdAndDelete(req.params.id)
        res.redirect('/materials')
    } catch (err) {
        console.error(err)
        res.redirect('/materials')
    }
});


module.exports = router