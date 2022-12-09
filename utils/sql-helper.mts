import mysql from "mysql";
import shortid from "shortid";

let _conn: any = {}

const logDbState = function () {
    console.log(
      "db state %s and threadID %s",
      _conn.state,
      _conn.threadId
    );
  };

const executeSql = (sql, params) => {
  let _conn = mysql.createConnection({
    // 创建mysql实例
    host: "139.159.245.209",
    port: "3306",
    user: "meta",
    password: "meta",
    database: "meta",
  });
  _conn.connect(function (err) {
    if (err) {
      console.log("fail to connect db", err.stack);
      throw err;
    }
    // 这里正真连接上数据库了。
    console.log(
      "链接成功--db state %s and threadID %s",
      _conn.state,
      _conn.threadId
    );
    logDbState();
  });
  return new Promise((resolve, reject) => {
    try {
      let sqlParamsList = [sql];
      if (params) {
        sqlParamsList.push(params);
      }
      _conn.query(...sqlParamsList, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          close(_conn);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const close = (conn) => {
  conn.end((err) => {
    if (err) {
      console.log("error ", err);
    } else {
      console.log("关闭成功", conn.state, conn.threadId);
    }
  });
};

export const writerLog = async (project, content, version) => {
  let id = shortid.generate()
  // await executeSql("INSERT INTO CiCdLog values(?,?,?,?,null,null)", [id,
  //   project,
  //   content,
  //   version,
  // ]);
};
