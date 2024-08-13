const { mongo } = require("mongoose");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const home = (req, res) => {
  res.send("home");
};

// const itemsPage = async (req, res) => {
//   console.log("start");
//   try {
//     const result = await mongodb.getDb().db().collection("games").find();
//     console.log(result);
//     result.toArray().then((lists) => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200).json(lists);
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const itemsPage = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("games").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleGame = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("games")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//CREATE contact
const createItem = async (req, res) => {
  try {
    const game = {
      Title: req.body.Title,
      Date: req.body.Date,
      Genre: req.body.Genre,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("games")
      .insertOne(game);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "some error occurred while creating the game");
    }
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};
//update one student
const updateGame = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const game = {
      Title: req.body.Title,
      Date: req.body.Date,
      Genre: req.body.Genre,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("games")
      .replaceOne({ _id: userId }, game);
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while updating the game");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//delete game
const deleteGame = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("games")
      .deleteOne({ _id: userId });
    if (response.acknowledged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(response.error || "something went wrong with deleting the game");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  home,
  itemsPage,
  getSingleGame,
  createItem,
  updateGame,
  deleteGame,
};
