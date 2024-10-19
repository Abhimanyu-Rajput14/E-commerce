require('dotenv').config();
const mongoose = require("mongoose");
const ProductModel = require("./models/Product.model");
const ReviewModel = require("./models/Review.model");
const { DB_URL: mongoURL } = process.env

mongoose
  .connect(mongoURL)
  .then(() => console.log("Seed DB connected!"))
  .catch((err) => console.log(err));

async function seedDB() {
  const products = [
    {
      title: "Drone",
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 20000,
      description:
        "Foldable drone with HD camera, remote control, and gesture features.",
    },
    {
      title: "iPhone",
      image:
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 80000,
      description:
        "Latest iPhone with sleek design, powerful performance, and great camera.",
    },
    {
      title: "Macbook",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 120000,
      description:
        "Powerful Macbook with Retina display, ideal for professionals and students.",
    },
    {
      title: "Markers",
      image:
        "https://images.unsplash.com/photo-1580569214296-5cf2bffc5ccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFya2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 800,
      description:
        "Vibrant markers for artists, offering smooth application in multiple colors.",
    },
    {
      title: "Nike Shoes",
      image:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 6000,
      description:
        "Comfortable Nike shoes designed for performance in sports and casual wear.",
    },
    {
      title: "Watch",
      image:
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 3200,
      description:
        "Elegant watch with classic design, perfect for any occasion and daily use.",
    },
    {
      title: "Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 4500,
      description:
        "High-quality headphones for immersive sound and comfortable long-term wear.",
    },
    {
      title: "Book",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 1500,
      description:
        "Engaging book perfect for knowledge and adventure lovers alike.",
    },
    {
      title: "Sony Controller",
      image:
        "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 8500,
      description:
        "Comfortable Sony controller with responsive controls for an enhanced gaming experience.",
    },
    {
      title: "PS5",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UFM1fGVufDB8fDB8fHww",
      price: 55000,
      description:
        "Next-gen PS5 console offering stunning graphics and a vast game library.",
    },
  ];

  await ProductModel.deleteMany();
  await ReviewModel.deleteMany();
  await ProductModel.create(products);

  console.log("DB seeded!");
}

// seedDB();
