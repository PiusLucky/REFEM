const express = require("express");
const  authMiddleware = require('../middleware/authMiddleware')
const { saveUserInstanceAndReturnJSON } = require("../utils/auth");
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
    activationCode,
    loggedIn,
    logout
} = require("../controllers/auth");



const router = express.Router();

// Register Route
router.post("/register", registerUser, saveUserInstanceAndReturnJSON());

// Login Route
router.post("/login", loginUser);

// Route to get loggedIn user data
router.get("/loggedIn", authMiddleware, loggedIn());

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post("/password-reset", resetPassword);

// Reset Password Route
router.post("/email-verify", verifyEmail);

// Reset Password Route
router.post("/resend-activation-code", activationCode);

// Logout Route
router.get('/logout', logout);

// detail page of a specific post based on unique slug
// router.get('/:slug', async (req, res) => {
//   try {
//     const article = await BlogModel.findOne({ slug: req.params.slug })
//     res.json(article)
//   }catch (err){
//     res.json({
//       message: err
//     })
//   }
// })

// // edit existing by patch()
// router.patch('/edit/:id', async (req, res, next) => {
//   req.article = await BlogModel.findById(req.params.id)
//   next()
// }, saveInstanceAndReturnJSON())

// // delete existing by delete()
// router.delete('/delete/:id', async (req, res) => {
//   try{
//     const removedPost = await BlogModel.findByIdAndDelete(req.params.id)
//     res.json(removedPost)
//   }catch(err) {
//     res.json({
//       message: err
//     })
//   }

// })

module.exports = router;

// https://www.json-generator.com/
// {
//   "title": "{{lorem(1, 'sentences')}}",
//   "status": "Live",
//   "description": "{{lorem(1, 'paragraphs')}}",
//   "body": "{{lorem(7, 'paragraphs')}}"
// }

//register.json
// {
//   "username": "{{firstName(['male'])}}{{surname(['female'])}}{{integer([1],[9])}}",
//   "firstname": "{{firstName(['male'])}}{{surname(['female'])}}",
//   "lastname": "{{firstName(['male'])}}{{surname(['female'])}}",
//   "email": "{{email([true])}}",
//   "password": "John&Matt&5",
//   "repeatPassword": "John&Matt&5"
// }

//login.json
// {
//   "username_email": "<insert existing_username or existing_email>",
//   "password": "John&Matt&5"
// }
