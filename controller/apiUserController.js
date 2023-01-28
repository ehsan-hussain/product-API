const User = require('../models/APIUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.registerAPIUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // res.json({password: req.body.password, hashedPassword: hashedPassword});

    const user = new User({
      username: req.body.username,
      password: hashedPassword
    })
    await user.save();
    res.json({message: 'You just got registerd'})
  } catch (error) {
    res.json({message: error});

  }
}

exports.generateAccessToken = async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});

    const ispasswordcorrect = await bcrypt.compare(req.body.password, user.password);

    if (user && ispasswordcorrect) {
      const payLoad = {
        username: user.username,
        date: user.date
      }

      const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET)
      res.json({accessToken: accessToken});
    } else {
      res.json({message: 'Incorrect user information, please try agian'});

    }


  } catch (error) {
    res.json({message: error});

  }
}