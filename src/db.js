import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError); //on은 어려번 일어날수 있는것
db.once("open", handleOpen); //once는 한번만 발생하는 것
