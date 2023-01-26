// https://codepen.io/suwonleee/pen/poZVZqV?editors=0011
import React, {
  useState,
  useMemo,
  useCallback
} from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

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
          
            setMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)
          }
        >
          감소
        </button>
      </div>
    </>
  );
}

const MemoizedOrderMainFood = React.memo(OrderMainFood);

function OrderOptions({
  selectedCount,
  options,
  toggleAllChecked,
  btnAllChecked,
  optionCheckeds,
  toggleOptionCheck
}) {
  console.log(`OrderOptions 실행됨`);

  return (
    <>
      <h2>
        옵션 ({selectedCount} / {options.length})
      </h2>
      <span
        onClick={toggleAllChecked}
        style={{ paddingLeft: 30, userSelect: "none" }}
      >
        {btnAllChecked ? "[x]" : "[ ]"} 전체선택
      </span>
      <ul>
        {options.map((option, index) => (
          <li
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

  const toggleOptionCheck = useCallback(
    (index) => {
      const newOptionCheckeds = optionCheckeds.map((el, _index) =>
        _index == index ? !el : el
      );
      setOptionCheckeds(newOptionCheckeds);
    },
    [optionCheckeds]
  );

  const btnAllChecked = useMemo(() => optionCheckeds.every((el) => el), [
    optionCheckeds
  ]);

  const selectedCount = useMemo(
    () => optionCheckeds.filter((el) => el).length,
    [optionCheckeds]
  );

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

function App() {
  return (
    <>
      <Order />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));