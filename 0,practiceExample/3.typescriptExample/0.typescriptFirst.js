//tsconfig.json 파일까지 세팅 완료하고, 
//tsc -w 실행하면 계속 변경된다.
// ! 변수 타입 지정
var stringType = 'kim';
// stringType = 123; -> 이름은 string 만 가능하다고 했는데, 숫자 집어넣으면 바로 에러
// Type : string , number, boolean, null, undefined, bigint, [], {}
// ! 리스트 변수 타임 지정 
// [] 자료형 안에 무조건 string 이 들어가있어야한다.
var listType = ['kim', 'park', 'lee'];
// {} 자료형 name 안에 무조건 string이 들어가있어야한다.
// change 는 ? 이 붙어있으므로 자료 구성에 필수는 아니다.
var objectType = { name: 'kim' };
// ! '또는' '그리고' 변수 타입 지정
// orAnd 에는 string 또는 number 타입이 들어갈 수 있다.
var orAnd = 'kim';
var nothingType = 123;
//! 함수에도 타임 지정 가능
// x 값은 number만 들어와야함. 
// 결과값도 number만 들어와야함.     여기적는 것이 결과값
function example(x) {
    return x * 2;
}
var john = [123, true];
var mike = { name: "lee", age: 32, gf: false };
var oliver = { name: "kim" };
// ! class
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
