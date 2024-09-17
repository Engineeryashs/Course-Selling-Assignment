// Middleware for handling auth
const{Admin}=require("../db");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username;
    const password=req.headers.password;
    Admin.findOne({
        username:username,
        password:password
    }).then(function(rk){
        console.log(rk);
        if(rk){
            next();
        }
        else{
            res.status(403).json({
                msg:"This Admin doesn't exists"
            })
        }
    })

}

module.exports = adminMiddleware;