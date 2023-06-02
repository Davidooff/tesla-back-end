import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const userRout = require("./routes/User.ts");
app.use("/user", userRout);

const PORT = process.env.PORT || 4111;
app.listen(PORT, () => console.log("Server don start for port: " + PORT));
