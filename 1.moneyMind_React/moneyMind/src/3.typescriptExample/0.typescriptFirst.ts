//tsconfig.json 파일까지 세팅 완료하고, 
//tsc -w 실행하면 계속 변경된다.

// ! 변수 타입 지정
let stringType :string = 'kim';
// stringType = 123; -> 이름은 string 만 가능하다고 했는데, 숫자 집어넣으면 바로 에러

// Type : string , number, boolean, null, undefined, bigint, [], {}

// ! 리스트 변수 타임 지정 
// [] 자료형 안에 무조건 string 이 들어가있어야한다.
let listType :string[] = ['kim', 'park', 'lee']
// {} 자료형 name 안에 무조건 string이 들어가있어야한다.
// change 는 ? 이 붙어있으므로 자료 구성에 필수는 아니다.
let objectType :{ name : string , change? : string } = { name : 'kim'}

// ! '또는' '그리고' 변수 타입 지정
// orAnd 에는 string 또는 number 타입이 들어갈 수 있다.
let orAnd :string | number = 'kim';


// ! 타입을 변수에 지정 가능하다
// 타입 변수명은 대문자 사용
type Mytype = string | number;

let nothingType :Mytype = 123;

//! 함수에도 타임 지정 가능
// x 값은 number만 들어와야함. 
// 결과값도 number만 들어와야함.     여기적는 것이 결과값
function example(x :number) :number{
  return x * 2
} 

//! array 순서에 타입 정해주기 --> tuple 타입
type Member = [number, boolean];
let john :Member = [123, true]


//!  - > 일괄적으로 변수 지정해주기.
// 해당하는 타입을 일괄적으로 지정 가능
type Memberlist ={
  name : string,
  age : number,
  gf : boolean
}

let mike :Memberlist = { name : "lee", age : 32, gf : false}

// objectd에 타입 지정해야할 속성이 너무 많으면
type Toomanythings = {
  [key :string] : string,
}
let oliver :Toomanythings = {name : "kim"}

// ! class

class User {
  //
  name :string;
  constructor(name :string){
    this.name = name;
  }
}