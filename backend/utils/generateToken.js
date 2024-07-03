import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId , res) => {
    const token = jwt.sign ({userId}, process.env.JWT_SECRET,{
        expiresIn: "15d"
    })

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //Measured in milliseconds
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" //cookie only works in production t.e not in development (when i put some other value instead of "development" for the mentioned variable in the .env file, this gives "secure: true for this line")
    })
}

export default generateTokenAndSetCookie