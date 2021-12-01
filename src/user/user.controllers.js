const User = require('./user.model');

exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();
    await newUser.save();
    res.status(200).send({ messages: 'success', newUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: 'something went wrong, check server logs' });
  }
};

exports.logIn = async (req, res) => {
  try {
    const token = await req.user.generateAuthToken();
    res.status(200).send({ user: req.user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'check server logs' });
  }
};

//favourite book
exports.favouriteBook = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });
    const favBook = await user.favourite(req.body.id);
    res.status(200).send({ messages: 'success', favBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'check server logs' });
  }
};

//unfavourite book
exports.unfavouriteBook = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });
    const unfavBook = await user.unFavourite(req.body.id);
    res.status(200).send({ messages: 'removed', unfavBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'check server logs' });
  }
};

//list favourite books
exports.listFavBook = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });
    const listFavBook = await user.isFavourite();
    res.status(200).send({ messages: 'Success', listFavBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'check server logs' });
  }
};
