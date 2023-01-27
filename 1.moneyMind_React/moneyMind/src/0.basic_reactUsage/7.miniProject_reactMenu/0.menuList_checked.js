// https://codepen.io/suwonleee/pen/poZVZqV?editors=0011
import React, {
  useState,
  useMemo,
  useCallback
} from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

// ! 메인 주문 조건 관련
function OrderMainFood({ setMainFoodCount, mainFoodCount }) {
  console.log(`OrderMainFood 실행됨`);

  return (
    <>
      <h2>메인 (수량 : {mainFoodCount})</h2>
      <div>
        <button onClick={() => setMainFoodCount(mainFoodCount + 1)}>
          증가
        </button>
        <button
          onClick={() =>
            // 감소 버튼을 놀렀을 때 1인 경우 결과값을 1로, 그 외엔 -1씩 해주기 
            setMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)
          }
        >
          감소
        </button>
      </div>
    </>
  );
}

// * 콘솔에 `OrderMainFood 실행됨` 이 출력.
// 하지만 React.memo 덕분에 재실행되진 않는다.
// 즉, 메인 관련된 숫자가 변화할 때만 재실행된다.
const MemoizedOrderMainFood = React.memo(OrderMainFood);


// ! *** 주문 조건 관련.
function OrderOptions({
  selectedCount,
  options,
  toggleAllChecked,
  btnAllChecked,
  optionCheckeds,
  toggleOptionCheck
}) {
  //옵션의 조건이 바뀔 때마다 실행된다.
  console.log(`OrderOptions 실행됨`);

  return (
    <>
      <h2>
      {/* 옵션은 선택된 카운트 / 전체 길이 */}
        옵션 ({selectedCount} / {options.length})
      </h2>
      <span
      // 전체 선택 토글 버튼
        onClick={toggleAllChecked}
        style={{ paddingLeft: 30, userSelect: "none"}}
      >
        {btnAllChecked ? "[x]" : "[ ]"} 전체선택
      </span>
      <ul>
        {options.map((option, index) => (
          <li
          // ** userSelect: "none"으로 설정하면 클릭 / 드래그 사용이 되지 않는다.
            style={{ userSelect: "none", cursor: "pointer" }}
            key={option}
            onClick={() => toggleOptionCheck(index)}
          >
            {optionCheckeds[index] ? "[x]" : "[ ]"}
            {option}
          </li>
        ))}
      </ul>
    </>
  );
}

const MemoizedOrderOptions = React.memo(OrderOptions);

// ! *** 주문 관련된 파트.
function Order() {
  const [mainFoodCount, setMainFoodCount] = useState(1);

  const options = useMemo(() => [
    "콜라 1.5",
    "머스타드 소스",
    "홀스래디쉬 소스",
    "스윗어니언 소스",
    "마라 소스",
    "케찹 소스"
  ], []);

  const [optionCheckeds, setOptionCheckeds] = useState(
    new Array(options.length).fill(false)
  );

  // * 체크하는 토글 옵션
  const toggleOptionCheck = useCallback(
    (index) => {
      const newOptionCheckeds = optionCheckeds.map((el, _index) =>
        _index == index ? !el : el
      );
      setOptionCheckeds(newOptionCheckeds);
    },
    [optionCheckeds]
  );
  // * 전체 체크 옵션 
  const btnAllChecked = useMemo(() => optionCheckeds.every((el) => el), [
    optionCheckeds
  ]);

  // * 체크 한 토글 체크
  const selectedCount = useMemo(
    () => optionCheckeds.filter((el) => el).length,
    [optionCheckeds]
  );

  // * 전부 다 체크 된 경우
  const toggleAllChecked = useCallback(() => {
    if (btnAllChecked) {
      // 전부 체크해제 해야함
      const newOptionCheckeds = optionCheckeds.map((el) => false);
      setOptionCheckeds(newOptionCheckeds);
    } else {
      // 전부 체크 해야함
      const newOptionCheckeds = optionCheckeds.map((el) => true);
      setOptionCheckeds(newOptionCheckeds);
    }
  }, [optionCheckeds]);

  return (
    <>
      <h1>음식주문</h1>

      <MemoizedOrderMainFood
        setMainFoodCount={setMainFoodCount}
        mainFoodCount={mainFoodCount}
      />
      <MemoizedOrderOptions
        selectedCount={selectedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        optionCheckeds={optionCheckeds}
        btnAllChecked={btnAllChecked}
        toggleOptionCheck={toggleOptionCheck}
      />
      <MemoizedOrderOptions
        selectedCount={selectedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        optionCheckeds={optionCheckeds}
        btnAllChecked={btnAllChecked}
        toggleOptionCheck={toggleOptionCheck}
      />
    </>
  );
}

// ! *** 앱 시작
function App() {
  return (
    <>
      <Order />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));