const UserModel = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userRegistration = async (req, res) => {
  const { name, email, role, password, cpassword } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    res.send({ status: false, message: 'Email already exists' });
  } else {
    if (name && email && role && password && cpassword) {
      if (password === password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashpassword = await bcrypt.hash(password, salt);
          const hashcpassword = await bcrypt.hash(cpassword, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            role: role,
            password: hashpassword,
            cpassword: hashcpassword,
          });
          await doc.save();
          const save_user = await UserModel.findOne({ email: email });

          const token = jwt.sign(
            { id: save_user._id },
            process.env.JWT_SECRET_KEY
          );
          console.log(token);
          res.status(201).send({
            status: true,
            message: 'Registration Success',
            token: token,
            role: save_user.role,
          });
        } catch (err) {
          console.log(err);
          res.send({ status: false, message: 'Unable to Register' });
        }
      } else {
        res.send({
          status: false,
          message: 'Password and Confirm Password doesn"t match',
        });
      }
    } else {
      res.send({ status: false, message: 'All fields are required' });
    }
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (name && password) {
      const user = await UserModel.findOne({ name: name });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (name === user.name && isMatch) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

          res.status(201).send({
            status: true,
            message: 'Login Success',
            token: token,
            role: user.role,
          });
        } else {
          res.send({
            status: false,
            message: 'Name or Password is not Valid',
          });
        }
      } else {
        res.send({
          status: false,
          message: 'You are not a Registered User',
        });
      }
    } else {
      res.send({ status: false, message: 'All Fields are Required' });
    }
  } catch (err) {
    console.log(err);
    res.send({ staus: false, message: 'Unable to login' });
  }
};

exports.userGet = async (req, res) => {
  try {
    const doc = await UserModel.find();

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.userGetById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// exports.userUpdate = async (req, res) => {
//   try {
//     const doc = await UserModel.updateOne(
//       { _id: req.params.id },
//       { $set: req.body }
//     );
//     return res.status(200).json(doc);
//   } catch (err) {
//     res.status(200).json({ message: err.message });
//   }
// };

exports.userUpdate = async (req, res) => {
  const { name, email, role, password, cpassword } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    res.send({ status: false, message: 'Email already exists' });
  } else {
    if (name && email && role && password && cpassword) {
      if (password === password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashpassword = await bcrypt.hash(password, salt);
          const hashcpassword = await bcrypt.hash(cpassword, salt);
          const doc = await UserModel.updateOne(
            { _id: req.params.id },
            {
              $set: {
                name: name,
                email: email,
                role: role,
                password: hashpassword,
                cpassword: hashcpassword,
              },
            }
          );
          return res.status(200).json(doc);
        } catch (err) {
          console.log(err);
          res.send({ status: false, message: 'Unable to update' });
        }
      } else {
        res.send({
          status: false,
          message: 'Password and Confirm Password doesn"t match',
        });
      }
    } else {
      res.send({ status: false, message: 'All fields are required' });
    }
  }
};
exports.userDelete = async (req, res) => {
  try {
    const doc = await UserModel.deleteOne({ _id: req.params.id });
    return res.status(200).json(doc);
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};
