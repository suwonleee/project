// ## 명언 데이터, 시작

//명언 불러오기 함수 
function getWiseSaying() {
  function getData() {
    // 엔터(열 공백)을 기준으로 자르고(split), 공백(스페이스) 없애고 배열 저장
    const arr = window.wiseSayings.trim().split("\n");

    //빈 데이터 리스트 만들기.
    const data = [];

    //arr에 담긴 값을 forEach 반복문으로 재구성하기
    arr.forEach((row, index) => {
      // 내용 중 '//'은 내용과 작가의 구분이다. 그래서 //로 split 해준 것.
      const [str, writer] = row.split("//");

      // 빈 배열 data에 우리가 나눠준 값 추가해주기(js.push) { index(번호), str(명언글), writer(작가) }
      data.push({
        index,
        str,
        writer,
      });
    });

    return data;
  }
  //똑같은 배열 재사용(반복) 하는 방법.
  // 만약 인덱스(index)를 받아오면 다듬어서 우리가 가진 데이터 길이에 맞게 만들기
  function get(index) {
    //인덱스 배열이 데이터 길이로 나눈 나머지 그 인덱스 다시 재반복!
    index = index % data.length;

    return data[index];
  }

  //만든 큰 함수 getData()를 data에 다시 채워주기.
  const data = getData();

  return {
    get,
  };
}

const wiseSaying = getWiseSaying();

//다른 파일에서 사용할 수 있게 출력
export function WiseSaying({ index }) {
  //wiseSaying 에 인덱스를 받아오면 인덱스 내에 str 과 writer 값을 구조분해할당으로 받는다.
  //ex) var { a1, a2, ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };
  // console.log(a1); // 10
  // console.log(a2); // 20
  const { str, writer } = wiseSaying.get(index);
  
  //사용자 화면에 나타내기 문장(str)과 -작가명(writer)-로 
  return (
    <>
      {str}
      <br />- {writer} -
    </>
  );
}