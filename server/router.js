import { Router } from "express";
const router = Router();
import url from "url";
import SQLConnect from "./connect.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./jwtSecret.js";
import { adminData } from "./data/admin.js";
import { vipData } from "./data/vip.js";
import { lineData } from "./data/line.js";
import { log } from "console";

// 登录接口
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body);
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
        status: 500,
        menuData: [],
      });
      break;
  }
});

// 折线图数据接口
router.get("/line", (req, res) => {
  res.send({
    status: 200,
    lineData: lineData,
  });
});

//信息查询接口
router.get("/project/all", (req, res) => {
  //分页
  let page = url.parse(req.url, true).query.page || 1; //默认页码
  const sql =
    "select * from project order by id desc limit 15 offset " + (page - 1) * 1;
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({ status: 200, data: result });
    } else {
      res.send({ status: 500, data: "暂时没有数据" });
    }
  });
});

// 数据模糊查询
router.get("/project/search", (req, res) => {
  //查询内容
  const search = url.parse(req.url, true).query.search;
  console.log(search);
  const sql =
    "SELECT * FROM project WHERE CONCAT(`name`,`address`,`remark`) LIKE '%" +
    search +
    "%'";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({ status: 200, result });
    } else {
      res.send({ status: 500, msg: "查找不到相关数据" });
    }
  });
});

//获取分页总数
router.get("/project/total", (req, res) => {
  const sql = "SELECT COUNT(*) FROM project WHERE id";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({ status: 200, result });
    } else {
      res.send({ status: 500, msg: "查找不到相关数据" });
    }
  });
});

//添加项目信息
router.get("/project/add", (req, res) => {
  let name = url.parse(req.url, true).query.name || "";
  let number = url.parse(req.url, true).query.number || "";
  let money = url.parse(req.url, true).query.money || "";
  let address = url.parse(req.url, true).query.address || "";
  let duration = url.parse(req.url, true).query.duration || "";
  let startTime = url.parse(req.url, true).query.startTime || "";
  let endTime = url.parse(req.url, true).query.endTime || "";
  let quantity = url.parse(req.url, true).query.quantity || "";
  let status = url.parse(req.url, true).query.status || "";
  let remark = url.parse(req.url, true).query.remark || "";
  const sql = "insert into project values (null,?,?,?,?,?,?,?,?,?,?)";
  const arr = [
    name,
    number,
    money,
    address,
    duration,
    startTime,
    endTime,
    quantity,
    status,
    remark,
  ];
  SQLConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});

//删除项目信息
router.get("/project/del", (req, res) => {
  let id = url.parse(req.url, true).query.id;
  let sql = "delete from project where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});

//项目信息预更新接口
router.get("/project/update/pre", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "select * from project where id = ?";
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "查询成功",
        result: result[0],
      });
    } else {
      res.send({
        status: 500,
        msg: "查询失败",
      });
    }
  });
});

export default router;
