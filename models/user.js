const Sequelize = require('sequelize');
// models/user.js
// Users모델 만들고 모듈로 exports.
// Users모델은 Sequelize.Model 확장한 클래스로 선언.
// 모델은 크게 static init 메서드와 static associate 메서드로 나뉨.
module.exports = class Users extends Sequelize.Model {
    static init(sequelize) { // 테이블에 대한 설정
        return super.init({ // 첫번째 인수는 테이블 컬럼 관한 설정
            // 두번째 인수는 테이블 자체에 대한 설정
            // 시퀄라이즈는 알아서 id 기본 키로 연결하므로 id 컬럼은 적을 필요 없음
            // 나머지는 MySQL 테이블과 컬럼 내용이 일치해야 정확히 대응됨.
            // 단 서로 자료형 조금씩 다름.
            name: {
                type: Sequelize.STRING(20), // MySQL에서 VARCHAR는 STRING으로
                allowNull: false, // NOT NULL과 같은 의미
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED, // INT는 INTEGER로
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN, // TINYINT는 BOOLEAN으로
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE, // DATETIME은 DATE로
                allowNull: false,
                defaultValue: Sequelize.NOW, // DEFAULT now()
            },
        }, { // 두번째 인수는 테이블 옵션
             // static init 메서드의 매개변수와 연결되는 옵션.
             // db.sequelize 객체 넣어야 함. 나중에 model.index.js에서 연결함.
            sequelize,
            // true면 시퀄라이즈는 createdAt과 updatedAt컬럼 추가함.
            // 각 로우 생성시, 수정시 시간 자동으로 입력 됨.
            // 하지만 직접 created_at 컬럼 만들었으므로 필요없음.
            timestamps: false, 
            // 시퀄라이즈는 기본적으로 테이블, 컬럼 명 camel case로 만듬.
            // 이를 snake case(created_at)로 바꾸는 옵션
            underscored: false,
            modelName: 'User', // 모델 이름 설정. 노드 프로젝트에서 사용
            tableName: 'users',
            // true 설정하면 deletedAt 컬럼 생김.
            // 로우 삭제시 완전히 지워지지 않고 deletedAt에 지운 시각 기록 됨.
            // 로우 조회 명령 내릴 시 deletedAt값이 null인 로우(삭제되지 않았다는 뜻) 조회함.
            // 나중에 로우 복원위해 사용
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) { //다른 모델과의 관계
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
}