import { userServices } from "../services/User.services.js";


const getUser = async (req, res) => {
    try {
        const result = await userServices.getUserInfo(req.userData["userId"]);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const editUser = async (req, res) => {
    try {
        const result = await userServices.editUserInfo(req.userData["userId"], req.body)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error.")
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await userServices.deleteUserInfo(req.userData["userId"]);
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send("Internal Server Error.")
    }
}

const userController = {
    getUser,
    editUser,
    deleteUser,
}

export {userController};