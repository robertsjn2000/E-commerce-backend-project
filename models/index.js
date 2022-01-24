// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});
// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'tags',
    foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    as: 'products',
    foreignKey: 'tag_id'
})

ProductTag.belongsTo(Product, {
    foreignKey: 'product_id'
})

ProductTag.belongsTo(Tag,{
    foreignKey: 'tag_id'
})

Tag.hasMany(ProductTag, {
    foreignKey: 'tag_id'
})

Product.hasMany(ProductTag, {
    foreignKey: 'product_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};