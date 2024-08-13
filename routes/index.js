const mainController = require("../controllers/index");
const routes = require("express").Router();

routes.get("/", mainController.home);

routes.get("/items", mainController.itemsPage);

routes.get("/items/:id", mainController.getSingleGame);

routes.post("/items", mainController.createItem);

module.exports = routes;
