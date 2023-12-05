import fs from "node:fs/promises";

import express from "express";
import { handleValidationErrors, validateOrder } from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  res.json(JSON.parse(meals));
});

app.post(
  "/orders",
  validateOrder(),
  handleValidationErrors,
  async (req, res) => {
    const orderData = req.body.order;
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };

    try {
      const orders = await fs.readFile("./data/orders.json", "utf8");
      const allOrders = JSON.parse(orders);
      allOrders.push(newOrder);
      await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    res.status(201).json({ message: "Order created!" });
  }
);

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
