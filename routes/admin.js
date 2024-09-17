const { Router } = require("express");      //Destructuring asingment of router method from express module
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic  
    //User.create() method returns the promises which on resolving gives inserted data or object like newuser 
    Admin.create(
        {
            username: req.body.username,
            password: req.body.password
        }
    ).then(function (newUser) {
        console.log(newUser);
        res.send({
            msg: "Admin Created Successfully",
            admin:newUser
        })
    }).catch(function (err) {
        console.log(err);
        res.status(403).json({
            msg: "Error in creating admin"
        })
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    }).then(function (newCourse) {
        console.log(newCourse);
        res.json({
            msg: "Course created succesfully",
            courseID: newCourse._id
        })
    }).catch(function (err) {
        console.log(err);
        res.status(404).json({
            msg: "Error in adding course"
        })
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const response = await Course.find({})
        res.json({
            course: response
        })
    }
    catch (error) {
        console.error("Error in fetching courses", error)
        res.status(404).json({
            msg: "Error in fetching courses"
        })
    }
});

module.exports = router;