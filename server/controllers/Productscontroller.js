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
    console.error('Error creating product:', error);
    response.status(500).json({ success: false, message: "There was an error when creating a product" });
  }
}
export const getAllProducts=async (req,res)=>{ 
  try {
    const products=await prisma.products.findMany();
    if(!products){
      res.status(404).json({message:"oops!product not found.."})
    }else{
      res.status(200).json(products)
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:"Oops!an error occured..."})
    console.log(error.message);
  }
}