const jwt = require('jsonwebtoken');
const data = {username :"nodemy"}
// const token = jwt.sign(data,"nodemy123456");
// console.log(token)
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTY2MjYxMjIwNX0.amYTk8Zc4byppbg_kQKdT0BKH7LpqRHB2teXk5lWx2E"
var ketqua = jwt.verify(token,'nodemy123456');
console.log(ketqua)