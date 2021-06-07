const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = {

  async store(req, res) {
    try {
      const { name, description } = req.body;
      const product = await Product.create({ name, description });

      return res.status(200).send(product);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async storeWithCategory(req, res) {
    try {
      const { category_id } = req.params
      const { name, description } = req.body;

      const category = await Category.findByPk(category_id);

      if (!category)
        throw new Error("category not found.");

      const [ product ] = await Product.findOrCreate({ where: {name, description} });

      await product.addCategory(category);

      return res.status(200).send(category);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async index(req, res) {
    try {

      const products = await Product.findAll({ include: { association: 'categories' } });

      return res.status(200).send(products);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findAll({where: {id}, include: { association: 'categories' }});
      if (!product)
        throw new Error("product not found.");

      return res.status(200).send(product);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {

      const { id } = req.params;
      const { name, description } = req.body;

      const product = await Product.findByPk(id);
      if (!product)
        throw new Error("product not found.");

      product.setAttributes({ name, description });
      product.save();

      return res.status(200).send({message: 'product has been updated', product});

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product)
        throw new Error("product not found.");

      product.destroy();

      return res.status(200).send({message: 'product has been deleted', product});

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
};