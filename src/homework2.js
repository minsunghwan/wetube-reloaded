import express from "express";

const PORT = 4000;

const app = express();

const Url_Logger = (req, res, next) => {
  console.log(`Path : ${req.url}`);
  next();
};
const Time_Logger = (req, res, next) => {
  console.log("Time : " + new Date().toLocaleDateString());
  next();
};
const Security_Logger = (req, res, next) => {
  if (req.protocol === ("http" || "https")) {
    console.log("secure");
  } else {
    console.log("insecure");
  }
  next();
};
const Protector_Logger = (req, res, next) => {
  if (`${req.url}` === "/protected") {
    return res.send("Not Allowed");
  }
  next();
};

app.use(Url_Logger, Time_Logger, Security_Logger, Protector_Logger);

app.get("/", (req, res) => {
  res.send("<h1>Welcome Home</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
