import { Router } from "express";
const router = Router();
import url from "url";
import SQLConnect from "./connect.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./jwtSecret.js";
import { adminData } from "./data/admin.js";
import { vipData } from "./data/vip.js";

// 登录接口
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  SQLConnect(sql, [username, password], (result) => {
    if (result.length > 0) {
      /**
       * 生成token
       * token:前后端在登录信息交互的时候，通过token验证身份
       */
      const token = jwt.sign(
        {
          id: result[0].id,
          username: result[0].username,
          permission: result[0].permission,
        },
        jwtSecret.secret,
        { expiresIn: "1h" }
      );
      res.send({
        status: 200,
        username: result[0].username,
        permission: result[0].permission,
        token,
        msg: "请求成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "用户名或密码错误",
      });
    }
  });
});

// 用户权限管理
router.get("/router", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  switch (user) {
    case "admin":
      res.send({
        status: 200,
        menuData: adminData,
      });
      break;
    case "vip":
      res.send({
        status: 200,
        menuData: vipData,
      });
      break;
    default:
      res.send({
        status: 200,
        menuData: vipData,
      });
      break;
  }
});

export default router;
