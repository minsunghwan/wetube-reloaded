import express from "express"; //node_modules에서 express를 찾아 import 하기
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

/* application 만들기 */

const PORT = 4000;

const app = express(); //express function을 사용해서 앱 만들기

/* application 설정 */

console.log(process.cwd());

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

/* 외부에서 접속을 listen*/

const handleListening = () =>
  console.log(`Server  listenting on port http://localhost:${PORT} ❤️`);

app.listen(PORT, handleListening); //port 번호 4000
