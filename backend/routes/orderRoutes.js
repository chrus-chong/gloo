import express from "express"
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getMySellerOrders,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/mysellerorders").get(protect, getMySellerOrders)
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, updateOrderToDelivered)

export default router
