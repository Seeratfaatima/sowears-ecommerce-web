const express = require('express');
const path = require('path');
const { sequelize, Product, Order, Message, Subscriber } = require('./database');
const app = express();
const port = 3000;
const multer = require('multer');

// Configure storage for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads as static files
app.use('/uploads', express.static('uploads'));

// Initial Product Data (For Seeding)
const initialProducts = [
    {
        name: "Cashmere Floral Dress",
        image: "white frock.webp",
        price: "PKR 6,950.00",
        rating: 4,
        description: "This elegant Cashmere Floral Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions, this dress exudes sophistication. Elevate your wardrobe with this stylish and versatile piece."
    },
    {
        name: "Lavender Affair Long Dress",
        image: "lightpurple.png",
        price: "PKR 5,950.00",
        rating: 4,
        description: "Lavender Affair Long Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Enchancing Cutwork Dress",
        image: "skin.webp",
        price: "PKR 9,950.00",
        rating: 4,
        description: "Enchancing Cutwork Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Zora Cutwork Purple Dress",
        image: "longdarkprurple.webp",
        price: "PKR 9,950.00",
        rating: 4,
        description: "Zora Cutwork Purple Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Victoria - Peach Floral Maxi",
        image: "pink3.webp",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Victoria - Peach Floral Maxi features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Milaska Brown Long Dress",
        image: "maroon.jpeg",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Milaska Brown Long Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Diara Lace Co Ord Set",
        image: "diara3.jpeg",
        price: "PKR 7,950.00",
        rating: 4,
        description: "Diara Lace Co Ord Set features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Leia Cut Work Shir",
        image: "lea1.jpeg",
        price: "PKR 4,950.00",
        rating: 4,
        description: "Leia Cut Work Shir features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Mayday - Black Floral Dress",
        image: "may1.webp",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Mayday - Black Floral Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Calla Floral Lace Dress",
        image: "floralpink.webp",
        price: "PKR 9,950.00",
        rating: 4,
        description: "Calla Floral Lace Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Mulberry Dress",
        image: "mullbery.jpeg",
        price: "PKR 12,950.00",
        rating: 4,
        description: "Mulberry Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Mintora Pastel Green Co Ord",
        image: "pastel.webp",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Mintora Pastel Green Co Ord features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Victoria Dress In Black",
        image: "blue.jpg",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Victoria Dress In Black features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Inky Floral Co Ord Set",
        image: "cord1.jpeg",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Inky Floral Co Ord Set features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Midori Ruffle Green Long Dress",
        image: "green3.jpeg",
        price: "PKR 7,950.00",
        rating: 4,
        description: "Midori Ruffle Green Long Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    },
    {
        name: "Plumpet Long Dress",
        image: "plumplet.webp",
        price: "PKR 6,950.00",
        rating: 4,
        description: "Plumpet Long Dress features a chiffon inner lining, delicate floral print, and pleated design with intricate frills. Perfect for special occasions."
    }
];

// Serve static files from current directory
app.use(express.static('./'));

// Serve index1.html as the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index1.html'));
});

// API Endpoint to get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// API Endpoint to get single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await Product.findByPk(id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});

// API Endpoint to add a new product
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, price, rating, description } = req.body;
        let imagePath = req.body.image; // Fallback to text field

        if (req.file) {
            imagePath = 'uploads/' + req.file.filename;
        }

        const newProduct = await Product.create({
            name,
            image: imagePath,
            price,
            rating: parseInt(rating),
            description
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

// API Endpoint to update a product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, rating, description } = req.body;
        const product = await Product.findByPk(id);

        if (product) {
            let imagePath = product.image; // Keep old image by default

            // If a new file is uploaded, use it
            if (req.file) {
                imagePath = 'uploads/' + req.file.filename;
            } else if (req.body.image && req.body.image !== product.image) {
                // If no file but there's a different text filename (for manual override)
                imagePath = req.body.image;
            }

            await product.update({ name, image: imagePath, price, rating: parseInt(rating), description });
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

// API Endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (product) {
            await product.destroy();
            res.json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

// --- ORDER ENDPOINTS ---

// Submit a new order
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, email, phone, address, items, total, paymentMethod } = req.body;

        const newOrder = await Order.create({
            customerName,
            email,
            phone,
            address,
            itemsCode: JSON.stringify(items), // Store items as JSON string
            total,
            paymentMethod,
            status: 'Pending'
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});

// Get all orders (for admin)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// Update an order status
app.put('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByPk(id);

        if (order) {
            await order.update({ status });
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
});

// --- MESSAGE ENDPOINTS ---

// Submit a new contact message
app.post('/api/messages', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newMessage = await Message.create({ name, email, phone, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Error saving message", error: error.message });
    }
});

// Get all messages (for admin)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// --- NEWSLETTER ENDPOINTS ---

// Subscribe to newsletter
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const [subscriber, created] = await Subscriber.findOrCreate({ where: { email } });
        if (created) {
            res.status(201).json({ message: "Subscribed successfully!" });
        } else {
            res.status(200).json({ message: "You are already subscribed!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error subscribing", error: error.message });
    }
});

// Get all subscribers (for admin)
app.get('/api/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscribers" });
    }
});




// Sync Database and Start Server
sequelize.sync().then(async () => {
    console.log("Database connected.");

    // Seed data if empty
    const count = await Product.count();
    if (count === 0) {
        console.log("Seeding initial data...");
        await Product.bulkCreate(initialProducts);
        console.log("Data seeded.");
    }

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
