const express = require('express');
const router = express.Router();
const Food = require('../models/foodmodel');
// const authenticateAdmin = require('../middleware/authenticate');

// Get all food items
router.get('/getfoods', async (req, res) => {
    try {
        const foods = await Food.find({});
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new food item
router.post('/addfood', async (req, res) => {
    try {
        const food = new Food(req.body);
        const savedFood = await food.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// router.get('/search', async (req, res) => {
//     try {
//         const query = req.query.query;
//         const foods = await Food.find({ $text: { $search: query } });
//         res.status(200).json(foods);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.get('/api/search', async (req, res) => {
    const { query } = req.query;
  
    try {
      if (query) {
        const items = await Food.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        });
  
        return res.status(200).json(items);
      }
      return res.status(400).json({ message: 'Query parameter is required.' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
  });
  





// Example usage in Thunder Client:
// POST http://localhost:5000/foods/addfood
// Body (raw JSON):
// {
//     "name": "Pizza Margherita",
//     "description": "Classic Italian pizza with tomatoes and mozzarella",
//     "price": 12.99,
//     "category": "Pizza",
//     "image": "pizza-margherita.jpg"
// }


// Get food by ID
router.get('/getfood/:id',  async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update food item
router.put('/updatefood/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete food item
router.delete('/deletefood/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
