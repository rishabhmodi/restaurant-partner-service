import { Router } from "express";
import RestaurantController from "../apis/restaurant/RestaurantController";
import MenuItemController from "../apis/menu-items/MenuItemController";
import RatingsController from "../apis/ratings/RatingsController";

const router = Router();

// Restaurant
router.post("/restaurant", RestaurantController._createRestaurant);
router.get("/restaurant", RestaurantController._getRestaurants);

// Menu Items
router.post("/menu-item", MenuItemController._createMenuItem);
router.get("/menu-items", MenuItemController._getMenuItems);

// Ratings
router.post("/rating", RatingsController._createRatings);
router.get("/ratings", RatingsController._getRatings);

export default router;
