import express from "express";

const PORT = 8080;

const app = express();

const handleRootRouter = (req, res) => {
  return res.send("<h1>Hi Root Router</h1>");
};
const handleAboutRouter = (req, res) => {
  return res.send("<h1>Hi About Router</h1>");
};
const handleContactRouter = (req, res) => {
  return res.send("<h1>Hi Contact Router</h1>");
};
const handleLoginRouter = (req, res) => {
  return res.send("<h1>Hi Login Router</h1>");
};

app.get("/", handleRootRouter);
app.get("/about", handleAboutRouter);
app.get("/contact", handleContactRouter);
app.get("/login", handleLoginRouter);

app.listen(PORT, () => console.log("well?"));
