import express from "express";
import { createOrder, getAllOrdersForAdmin, getOrders, updateOrderStatusAndNotes } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.get("/:pageSize/:pageNumber", getOrders)
orderRouter.get("/admin/:pageSize/:pageNumber", getAllOrdersForAdmin)
orderRouter.put("/:orderId", updateOrderStatusAndNotes)

export default orderRouter;