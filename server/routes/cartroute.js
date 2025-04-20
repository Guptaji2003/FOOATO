const express = require('express');
const router = express.Router();
const Cart = require('../models/cartmodel');
const User = require('../models/usermodel');

// Create cart
router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//addtocart
router.post('/addtocart', async (req, res) => {
  try {
    const { userId, user, product, productId } = req.body;
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      const productIndex = existingCart.items.findIndex(item => item.productId.toString() === productId.toString());
      if (productIndex !== -1) {
        existingCart.items[productIndex].quantity += 1;
      } else {
        existingCart.items.push({ productId,product, quantity: 1 });
      }
      await existingCart.save();
      res.status(201).json({ success: true, cart: existingCart });
    } else {
      const cart = new Cart({ userId, user, items: [{ productId, product, quantity: 1 }] });
      await cart.save();
      res.status(201).json({ success: true, cart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get cart by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.delete("/removecartitem/:id",async(req,res)=>{
//   await Cart.findByIdAndDelete(req.params.id);
//   res.send("done");
//   // res.send(cart);
// })

// // Update cart
// router.put('/:cartId', async (req, res) => {
//   try {
//     const cartId = req.params.cartId;
//     const { products } = req.body;
//     const cart = await Cart.findByIdAndUpdate(cartId, { products }, { new: true });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete cart
// router.delete('/:userId/remove/:cartId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const existingCart = await Cart.findOne({ userId });
//     if (existingCart) {
//     const cartId = req.params.cartId;
//     await existingCart.items.findByIdAndDelete(cartId);
//     res.json({ success: true,cartId });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.delete('/:userId/remove/:cartId', async (req, res) => {
  try {
    const { userId, cartId } = req.params;

    // Find the user's cart
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      // Find the index of the item to remove
      const itemIndex = existingCart.items.findIndex(item => item._id.toString() === cartId);

      if (itemIndex !== -1) {
        // Remove the item from the array
        existingCart.items.splice(itemIndex, 1);
        await existingCart.save();

        return res.json({ success: true, cartId });
      } else {
        return res.status(404).json({ message: 'Item not found in the cart' });
      }
    } else {
      return res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});










module.exports = router;

