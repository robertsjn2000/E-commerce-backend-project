const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                through: ProductTag,
                as: 'products',
                attributes: ['product_name']
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
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                through: ProductTag,
                as: 'products',
                attributes: ['product_name']
            }
        ]
    })
    .then(function(data){
        if(!data){
            res.status(404).json({
                message: 'Tag not found'
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
    try {
      const newTag = await Tag.create(req.body, {
        include: {
          model: Product,
          through: ProductTag,
          as: "products",
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      });
      res.status(201).json(newTag);
    } catch (error) {
      res.status(500).json(error)
    }
  
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatedTag = await Tag.update(req.body, {
        where:
          { id: req.params.id }
      });
      res.status(201).json(updatedTag)
  
    } catch (error) {
  
    }
   
  });

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(data){
        if(!data){
            res.status(404).json({
                message: "Tag not found"
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