const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                // attributes: ['product_name']
            }
        ]
    })
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                // attributes: ['product_name']
            }
        ]
    })
    .then(function(data){
        if(!data){
            res.status(404).json({
                message: 'Category not found'
            })
        }
        else{
            res.json(data)
        }
    })
    .catch(function(err){
        res.status(500).json(err)
    })
});

router.post('/', async (req, res) => {
    // create a new category
    try{
        const newCategory = await Category.create(req.body);
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
        const updatedCategory = await Category.update({category_name: req.body.category_name},{where: {id: req.params.id}});
        res.status(200).json(updatedCategory)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(data){
        if(!data){
            res.status(404).json({
                message: "Category not found"
            })
        }
        else {
            res.json(data)
        }
    })
    .catch(function(err) {
        res.status(500).json(err)
    })
});

module.exports = router;