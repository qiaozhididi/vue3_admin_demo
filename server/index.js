import express from "express";
const app = express();
import router from "./router.js";
import BodyParser from "body-parser";
import cors from "cors";

app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static("upload"));

app.listen(3000, () => {
  console.log("正在监听端口3000,http://127.0.0.1:3000");
});
