const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const ADMIN_KEY = process.env.ADMIN_KEY;

let leagueData = {
    news: [
        {
            title: "Welcome to the league",
            content: "Backend is working."
        }
    ]
};

app.get("/", (req, res) => {
    res.send("HCA Backend Running");
});

app.get("/api/data", (req, res) => {
    res.json(leagueData);
});

app.post("/api/update", (req, res) => {

    const key = req.headers["admin-key"];

    if (key !== ADMIN_KEY) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    leagueData = req.body;

    res.json({
        message: "League updated successfully"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});