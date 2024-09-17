const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://engineeryashs:Radhekanhaji143%40@cluster0.zldcnxu.mongodb.net/Course-selling');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here   //mongoose.Schema.types will give all the datatypes of mongoose(Just for understanding)
    username: String,
    password: String,
    purchasedCourse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:Number,
    imageLink:String
});
//mongoose.model returns an constructor function that creates an instance of model(documents)
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}