import { Router } from "express";
import RestaurantController from "../apis/restaurant/RestaurantController";

const router = Router();

// Restaurant
router.post("/restaurant", RestaurantController._createRestaurant);
router.get("/restaurant", RestaurantController._getRestaurant);

export default router;
