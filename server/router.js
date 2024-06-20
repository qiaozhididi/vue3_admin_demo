import { Router } from "express";
const router = Router();
import url from "url";
import SQLConnect from "./connect.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./jwtSecret.js";
import { adminData } from "./data/admin.js";
import { vipData } from "./data/vip.js";
import { lineData } from "./data/line.js";
import multer from "multer";
import fs from "fs";
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

//修改项目信息接口
router.put("/project/update/:id", (req, res) => {
  //优化上述使用的插入写法  使用restFull API
  const id = req.params.id;
  const {
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
  } = req.body;
  const sql = `update project set name=?,number=?,money=?,address=?,duration=?,startTime=?,endTime=?,quantity=?,status=?,remark=? where id=?`;
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
    id,
  ];
  SQLConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败",
      });
    }
  });
});

//隧道设计信息树形列表接口
router.get("/tunnel/list", (req, res) => {
  const sql = "select * from tunnel";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "查询成功",
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "查询失败",
      });
    }
  });
});

//隧道设计信息树形二级列表接口
router.get("/tunnel/list/child", (req, res) => {
  const cid = url.parse(req.url, true).query.cid;
  const sql = "select * from tunnelchild where cid=?";
  SQLConnect(sql, [cid], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "查询成功",
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "查询失败",
      });
    }
  });
});

//隧道设计信息内容
router.get("/tunnel/content", (req, res) => {
  const content = url.parse(req.url, true).query.content;
  const sql = "select * from tunnelcontent where content=?";
  SQLConnect(sql, [content], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "查询成功",
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "查询失败",
      });
    }
  });
});

//文件上传接口 http://localhost:3000/api/upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./upload/";
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), function (req, res, next) {
  var file = req.file;
  console.log("文件类型：%s", file.mimetype);
  console.log("原始文件名：%s", file.originalname);
  console.log("文件大小：%s", file.size);
  console.log("文件保存路径：%s", file.path);
  res.json({ res_code: "0", name: file.originalname, url: file.path });
});

// 更新隧道设计信息接口
router.get("/tunnel/content/urlpath", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const urlPath = url.parse(req.url, true).query.urlpath;
  const sql = "update tunnelcontent set urlpath=? where id=?";
  SQLConnect(sql, [urlPath, id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "上传成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "上传失败",
      });
    }
  });
});

//PDF预览接口
router.get("/tunnel/pdf", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "select * from tunnelcontent where id = ?";
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "获取成功",
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "获取失败",
      });
    }
  });
});

//用户列表
router.get("/user/list", (req, res) => {
  const sql = "select * from user";
  SQLConnect(sql, [], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "获取成功",
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "获取失败",
      });
    }
  });
});

//查询用户信息
router.get("/user/userinfo", (req, res) => {
  const searchUserInfo = url.parse(req.url, true).query.userinfo;
  const sql =
    "SELECT * FROM user WHERE CONCAT(`username`,`permission`,`phone`) LIKE '%" +
    searchUserInfo +
    "%'";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "获取成功",
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "获取失败",
      });
    }
  });
});

//删除用户信息接口
router.get("/user/del", (req, res) => {
  let id = url.parse(req.url, true).query.id;
  let sql = "delete from user where id=?";
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

export default router;
