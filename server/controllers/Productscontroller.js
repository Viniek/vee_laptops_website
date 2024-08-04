import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProduct(request, response) {
  const { productName, productPrice, productDescription, productImage } = request.body;

  // Basic validation (You can enhance this based on your requirements)
  if (!productName || !productPrice || !productDescription || !productImage) {
    return response.status(400).json({ success: false, message: "Missing required fields" });
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
    response.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error); // Improved logging
    response.status(500).json({ success: false, message: "There was an error when creating a product" });
  }
}
