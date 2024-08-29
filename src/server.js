import express from "express"; //node_modules에서 express를 찾아 import 하기
import morgan from "morgan";

/* application 만들기 */

const PORT = 4000;

const app = express(); //express function을 사용해서 앱 만들기

/* application 설정 */

const logger = morgan("dev");

// const logger = (req, res, next) => {
//   console.log(`${req.method} , ${req.url}`);
//   next();
// };

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (rul === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
};

const handleHome = (req, res) => {
  return res.send("i still love you");
};

const handleLogin = (req, res) => {
  return res.send("Login here.");
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

// app.use(logger);
// app.use(privateMiddleware);
app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);

/* 외부에서 접속을 listen*/

const handleListening = () =>
  console.log(`Server  listenting on port http://localhost:${PORT} ❤️`);

app.listen(PORT, handleListening); //port 번호 4000
