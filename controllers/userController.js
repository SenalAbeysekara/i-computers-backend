import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
    })

    user.save()
    .then(
        () => {
        res.status(200).json({ message: "User Created Successfully" });
    })
    .catch(
        (error) => {
        res.status(500).json({ message: "Error Creating User", error: error });
    });
}

//without .then usin await assyn 

// export async function createUserAsync(req, res) {
// 	const hashedPassword = bcrypt.hashSync(req.body.password, 10);

// 	const user = new User({
// 		email: req.body.email,
// 		firstName: req.body.firstName,
// 		lastName: req.body.lastName,
// 		password: hashedPassword,
// 	});
// 	try {
		
// 		await user.save();
// 		res.json({ message: "User created successfully" });

// 	} catch (error) {

// 		res.json({ message: "Error creating user", error: error });

// 	}
// }

export function loginUser(req, res){
    User.findOne(
        { 
            email: req.body.email 
        }
    ).then(
        (user) => {

            if(user == null){

                res.status(404).json({ message: "User Not Found" });

            }else{

                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

                if(isPasswordValid){

                    const token = jwt.sign(
                        {
                            email: user.email,                   
                            firstName: user.firstName,
                            lastName: user.lastName,
                            image: user.image,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified
                        }, "i-computers-2002")

                    res.status(200).json({ message: "Login Successful", token: token });
                }else{
                    res.status(401).json({ message: "Invalid Password" });
                }
            }
        }
    )
}

// export async function loginUser(req, res) {
//     try {
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//             return res.status(404).json({ message: "User Not Found" });
//         }

//         const isPasswordValid = bcrypt.compareSync(
//             req.body.password,
//             user.password
//         );

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid Password" });
//         }

//         const token = jwt.sign(
//             {
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 image: user.image,
//                 role: user.role,
//                 isEmailVerified: user.isEmailVerified
//             },
//             "i-computers-2002"
//         );

//         res.status(200).json({ message: "Login Successful", token });

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// }

export function isAdmin(req){
    if(req.user == null ){
        return false;
    }
    if(req.user.role == "admin" ){
        return true;
    }else{
        return false;
    }
}

