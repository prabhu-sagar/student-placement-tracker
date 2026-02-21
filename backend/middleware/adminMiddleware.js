const adminMiddleware = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.json({ message: "Access denied. Admin only." })
    }
    next()
}

module.exports = adminMiddleware