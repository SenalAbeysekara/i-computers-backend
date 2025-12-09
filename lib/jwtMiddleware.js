import jwt from 'jsonwebtoken'; 

export default function AuthorizeUser(req, res, next) {
    const header = req.header('Authorization');

    if(header != null){
        const token = header.replace('Bearer ', '');

        jwt.verify(token, "i-computers-2002", 
            (err, decoded) => {
                if(decoded == null){
                    res.status(401).json({ message: "Unauthorized Access - Invalid Token" });
                }else{
                    req.user = decoded;
                    next();
                }
            }
        )
    }else{
        //call the next middleware or route handler in the stack
        next();
    }
}
