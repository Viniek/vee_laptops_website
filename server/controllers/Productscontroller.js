import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProduct(req, res) {
  const { productName, productPrice, productDescription, productImage } = req.body;

  if (!productName || !productPrice || !productDescription || !productImage) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newProduct = await prisma.products.create({
      data: {
        productName,
        productPrice,
        productDescription,
        productImage,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: "There was an error when creating a product" });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    if (!products) {
      res.status(404).json({ message: "oops! product not found.." });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Oops! an error occurred..." });
    console.log(error.message);
  }
};

export async function DeleteProduct(req, res) {
  const { id } = req.params;
  try {
    const productExist = await prisma.products.findFirst({ where: { id:id } });
    if (!productExist) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }
    await prisma.products.delete({ where: { id: id} });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function getOneProduct(req, res) {
  const { id } = req.params;
  try {
    const oneProduct = await prisma.products.findFirst({ where: { id:id } });
    if (!oneProduct) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: oneProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { productName, productPrice, productDescription, productImage, productsRemaining } = req.body;
  console.log(req.body);
  try {
    const productExists = await prisma.products.findFirst({ where: { id: id } });
    if (!productExists) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }
    const data = {};
    if (productName !== undefined) data.productName = productName;
    if (productPrice !== undefined) data.productPrice = productPrice;
    if (productDescription !== undefined) data.productDescription = productDescription;
    if (productImage !== undefined) data.productImage = productImage;
    if (productsRemaining !== undefined) data.productsRemaining = productsRemaining;

    const updatedProduct = await prisma.products.update({
      where: { id: id },
      data: data,
    });
    res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}
