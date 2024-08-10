import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCartProducts = async (req, res) => {   
    const user = req.user;
    const userId = user.id;
    try {
        const cartProducts = await prisma.cart.findMany({
            where: { userid: userId },
            include: { product: true },
        });

        if (!cartProducts.length) {
            return res.status(404).json({ success: false, message: "No cart Products found..." });
        } else {
            return res.status(200).json({ success: true, message: "Products fetched successfully...", data: cartProducts });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error while fetching products..." });
    }
};

export const getSingleCartProduct=async (req,res)=>{
    const {id}=req.params;
    try {
        const cartProducts=await prisma.cart.findFirst({where:{id:id}})
    if(!cartProducts.length){
        return res.status(404).json({success:false,message:"Cart Product not found..."})
    }
    else{
        res.status(200).json({success:true,message:"Cart Product fetched successfully...",data:cartProducts})
    }
    } catch (error) {
        res.status(500).json({success:false,message:"An error Ocured while fetching cart product.Try again later..."})
    }
}

export const AddToCart = async (req, res) => {
    const user = req.user;  
    console.log(user.id);
    const userId = user.id;
    const { productid} = req.body; 

    try {
        if (!productid) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        const cartItem = await prisma.cart.create({
            data: {
                productid:productid,  
                userid: userId
            },
        });
        return res.status(200).json({ success: true, message: "Product added to cart." });  
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Error adding product to cart." });
        
    }
}



    export async function deleteCartProduct(req, res) {
        const user = req.user;
  const userId = user.id;
  const { id: cartItemId } = req.params;
        try {
            if (!cartItemId) {
                return res.status(400).json({ success: false, message: "Cart item ID is required" });
              }
          
              const cartItem = await prisma.cart.findUnique({
                where: { id: cartItemId },
              });
          
              if (!cartItem || cartItem.userid !== userId) {
                return res.status(403).json({success: false,message: "Unauthorized or cart item not found",
                  });
              }
          
              await prisma.cart.delete({
                where: { id: cartItemId },
              });
          
              res.status(200).json({ success: true, message: "Cart item deleted successfully" });
            } catch (error) {
              console.error("Error deleting cart item:", error.message);
              res.status(500).json({success: false,message: "An error occurred while deleting the cart item",
                });
            }
      }
      
