// models/index.js
// Sequelize는 패키지이자 생성자.
const Sequelize = require('sequelize');

const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// Sequelize는 패키지이자 생성자. config/config.json에서 db설정 불러온 후 MySQL 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize; // 연결 객체 나중에 재사용하기 위해 db.sequelize에 넣음

// db라는 객체에 User, Comment 모델 담아둠.
// 앞으로 db객체 require하여 User, Comment 모델에 접근 가능
db.User = User;
db.Comment = Comment;

// 각각의 모델의 static.init메서드 호출.
// init 실행되어야 테이블이 모델로 연결됨.
User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;