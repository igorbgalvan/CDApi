const Category = require('../models/Category');
const Product = require('../models/Product')

module.exports = {

  async storeWithProduct(req, res) {
    try {
      const { product_id } = req.params
      const { name, description } = req.body;

      const product = await Product.findByPk(product_id);

      if (!product)
        throw new Error("product not found.");

      const [ category ] = await Category.findOrCreate({ where: { name, description } });

      await product.addCategory(category);

      return res.status(200).send(category);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async store(req, res) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({ name, description });

      return res.status(200).send(category);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async index(req, res) {
    try {

      const categories = await Category.findAll({ include: { association: 'products' } });

      return res.status(200).send(categories);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findAll({where: {id}, include: { association: 'products' }});
      if (!category)
        throw new Error("category not found.");

      return res.status(200).send(category);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {

      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Category.findByPk(id);
      if (!category)
        throw new Error("category not found.");

      category.setAttributes({ name, description });
      category.save();

      return res.status(200).send({ message: 'category has been updated', category });

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category)
        throw new Error("category not found.");

        category.destroy();

      return res.status(200).send({ message: 'category has been deleted', category });

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
};