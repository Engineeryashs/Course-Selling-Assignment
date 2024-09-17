const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        let newUser = await User.create({
            username: username,
            password: password
        })
        res.json({ msg: "User account created succesfully" })
    }
    catch (err) {
        console.error("Error in creating user account", err);
        res.status(404).json({
            msg: "Error in creating user account"
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    //Here course.find() method returns the promise which on resolving gives array of documents or tables
    try {
        let allCourse = await Course.find({})
        console.log(allCourse);
        res.json({
            msg: "Courses found",
            course: allCourse
        })
    }
    catch (err) {
        console.error("Error in listing all the courses", err);
        res.status(404).json({
            msg: "Error in listing courses"
        })
    }

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    /*So, here $push operation is to put value in an array and if there is not an 
    array it will create an array and push elements in it syntax of push operation is
    $push:{
        arrayName:elementValue
    }*/
    try {
        let response = await User.updateOne({
            username: username
        },
            {
                "$push": {
                    purchasedCourse: courseId
                }
            })
        console.log(response);
        res.json({
            msg: "Course purchased succesfully"
        })
    } catch (err) {
        console.error(err);
        res.status(403).json("Error in purchasing courses")
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.body.username;
    try {
        let user = await User.find({
            username: username
        })
        console.log(user.purchasedCourse);
        const courses = await Course.find({
            _id: {
                 "$in": user.purchasedCourse
                 }
        })
        res.json({
            courses: courses
        })
    }
    catch (err) {
        console.error(err);
        res.status(403).json({ 
            msg: "Unable to fetch purchased courses" 
        })
    }

});

module.exports = router