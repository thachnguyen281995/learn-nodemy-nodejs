const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const User = require("./models/User");
const db = require("./models/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const PAGE_SIZE = 2;
User.connect();

app.get("/user", (req, res, next) => {
    var page = req.query.page;
    if (page) {
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }
        // console.log(page)
        var soLuongBoqua = (page - 1) * PAGE_SIZE;
        db.find({})
            .skip(soLuongBoqua)
            .limit(PAGE_SIZE)
            .then((data) => {
                db.countDocuments({}).then((total) => {
                    var tongsoPage = Math.ceil(total / PAGE_SIZE);
                    res.json({
                        total: total,
                        tongsoPage: tongsoPage,
                        data: data,
                    });
                });
            })
            .catch((err) => {
                res.status(500).json("Co loi");
            });
    } else {
        db.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json("Fail");
            });
    }
});

// !LOGIN
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    var duongDanFile = path.join(__dirname, "login.html");
    res.sendFile(duongDanFile);
});
// app.get("/home", (req, res) => {
//     var duongDanFileHome = path.join(__dirname, "home.html");
//     res.sendFile(duongDanFileHome);
// });
app.post("/login", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    db.findOne({ username: username, password: password })
        .then((data) => {
            if (data) {
                var token = jwt.sign(
                    {
                        _id: data._id,
                    },
                    "mk"
                );
                return res.json({
                    message: "thanh cong",
                    token: token,
                });
            } else {
                res.json("Thai bai");
            }
        })
        .catch((err) => {
            res.status(500).json("Co loi");
        });
});
// app.get('/private',(req, res,next)=>{
//    try{
//     // var token = req.params.token
//     var token = req.cookies.token
//     var ketQua = jwt.verify(token,"mk")
//     var user = db.findOne(token._id)
//     if(ketQua){
//         next()
//     }
//    }
//    catch(err){
//     // return res.json("ban phai login")
//     return res.redirect('/login')
//    }
// },(req, res, next)=>{
//     res.json("welcome")
// })
// ! Phân quyền user ( Student, Teacher, Manager)
// app.get('/task',(req, res, next)=>{
//     try{
//         var token = req.cookies.token
//         var ketQua = jwt.verify(token,"mk")
//         if(ketQua){
//             next()
//         }
//     }
//     catch(err){
//         return res.redirect('/login')
//     }
// },(req, res, next)=>{
//     res.json('All Task')
// })
var checkLogin = (req, res, next) => {
    try {
        var token = req.cookies.token;
        console.log(token);
        var idUser = jwt.verify(token, "mk");
        console.log(idUser);
        db.findOne({
            _id: idUser,
        })
            .then((data) => {
                if (data) {
                    req.data = data;
                    next();
                } else {
                    res.json("NOT PERMISSION");
                }
            })
            .catch((err) => {});
    } catch (err) {
        res.status(500).json("token khong hop le");
    }
};
var checkStudent = (req, res, next) => {
    var role = req.data.role;
    if (role === "student" || role === "teacher" || role === "manager") {
        next();
    } else {
        res.json("Not permission");
    }
};
var checkTeacher = (req, res, next) => {
    var role = req.data.role;
    if (role === "teacher" || role === "manager") {
        next();
    } else {
        res.json("Not permission");
    }
};
var checkManager = (req, res, next) => {
    var role = req.data.role;
    if (role === "manager") {
        next();
    } else {
        res.json("Not permission");
    }
};
app.get("/task", checkLogin, checkStudent, (req, res, next) => {
    res.json("All TASK");
});
app.get(
    "/student",
    checkLogin,
    checkTeacher,
    (req, res, next) => {
        next();
    },
    (req, res, next) => {
        res.json("STUDENT");
    }
);

app.get(
    "/teacher",
    checkLogin,
    checkManager,
    (req, res, next) => {
        next();
    },
    (req, res, next) => {
        res.json("TEACHER");
    }
);
app.get(
    "/home",
    (req, res, next) => {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, "mk");
        db.findById({
            _id: decodeToken._id,
        }).then((data) => {
            if (data.length == 0) {
                return res.redirect("/login");
            } else {
                if (data.role == 2) {
                    next();
                } else {
                    return res.redirect("/login");
                }
            }
        });
    },
    (req, res, next) => {
        res.sendFile(path.join(__dirname, "home.html"));
    }
);
app.post(
    "/edit",
    (req, res, next) => {
        var token = req.headers.cookie;
        var decodeToken = jwt.verify(token, "mk");
        db.find({
            _id: decodeToken._id,
        }).then((data) => {
            if (data.length == 0) {
                return res.redirect("/login");
            } else {
                if (data.role == 2) {
                    next();
                } else {
                    return res.json({
                        error: true,
                        message: "ban khong co quyen sua",
                    });
                }
            }
        });
    },
    (req, res, next) => {
        res.json("sua thanh cong");
    }
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
