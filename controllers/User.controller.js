import db from "../database/db.js";

const table = "users";

const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await db.query(`SELECT (user_email) FROM ${table} WHERE user_id = $1`, [userId]);
        const result = response.rows;
        if(result.length === 0) return res.status(404).send("User not found."); 
        res.send(result);
    } catch (error) {
        console.error("Error while fetching user: ", error);
    }
}

const userController = {
    getUser
}

export {userController};