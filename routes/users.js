const router = require("express").Router();

// model
const User = require("../models/User");

/*
GET LIST: /api/todo
GET ITEM: /api/todo/:id
POST (CREATE TODO): /api/todo
PUT (update todo): /api/todo/62c0ffa49d9b0c1167337548
DELETE (delete todo): /api/todo/62c0ffa49d9b0c1167337548
*/

// GET LIST
router.get("/", async (req, res) => {
  console.log("GET USER", req.query);

  try {
    const users = await User.find();
    res.status(200).json({
      data: users,
      msg: "Get user success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// GET A ITEM
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    // return success
    res.status(200).json({
      data: user,
      msg: "Get user success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// CREATE NEW ITEM
router.post("/", async (req, res) => {
  // req = request body -> client send
  // res = response body -> server return
  const todoItem = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await todoItem.save();

    // return success
    res.status(200).json({
      data: user,
      msg: "Create user success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// UPDATE ITEM
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const field = {};
  if (req.body.firstName) field.firstName = req.body.firstName;
  if (req.body.lastName) field.lastName = req.body.lastName;
  if (req.body.email) field.email = req.body.email;
  if (req.body.password) field.password = req.body.password;

  try {
    const item = await User.findOneAndUpdate(
      { _id: id },
      { $set: field },
      { new: true }
    );
    if (!item) {
      res.status(404).json({
        msg: "user not found",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Update Sccess",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const item = await User.findOneAndRemove({ _id: id });
    if (!item) {
      res.status(404).json({
        msg: "Item not found",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Delete Sccess",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});
module.exports = router;
