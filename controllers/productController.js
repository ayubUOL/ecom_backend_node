const productModel = require("../models/productsModel");

async function getProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}

async function getProduct(req, res) {
  try {
    const product = await productModel.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function createProductHandler(req, res) {
  const { brand, name, price, category, image, alt, badge, stock } = req.body;

  if (!brand || !name || !price || !category || !image) {
    return res.status(400).json({
      message: "brand, name, price, category and image are required",
    });
  }

  try {
    const id = `${slugify(brand)}-${slugify(name)}`;

    await productModel.createProduct({ id, brand, name, price, image, alt, badge, category, stock });

    const product = await productModel.getProductById(id);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "A product with this name already exists" });
    }
    res.status(500).json({ message: "Failed to create product" });
  }
}

async function updateProductById(req, res) {
  const { brand, name, price, category, image, alt, badge, stock } = req.body;

  if (!brand || !name || !price || !category || !image) {
    return res.status(400).json({
      message: "brand, name, price, category and image are required",
    });
  }

  try {
    const existing = await productModel.getProductById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updated = await productModel.updateProduct(req.params.id, {
      brand, name, price, image, alt, badge, category, stock,
    });

    if (!updated) {
      return res.status(500).json({ message: "Failed to update product" });
    }

    const product = await productModel.getProductById(req.params.id);
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
}

async function deleteProductById(req, res) {
  try {
    const existing = await productModel.getProductById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productModel.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProductHandler,
  updateProductById,
  deleteProductById
};