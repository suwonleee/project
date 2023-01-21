
import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";
//CountUp 라이브러리 활용하기
//활용 확인 : https://codepen.io/suwonleee/pen/gOjozwQ?editors=0010


export function CountNumber({ start = 0, end = 1000, duration = 2 }) {
  //useRef : DOM 조작 / 기억했다가 리로드 시 같이 리로드
  const spanRef = useRef(null);
  const countUpRef = useRef(null);

  //useEffect : 딱 한번만 실행되어야하는 경우 사용
  useEffect(() => {
    if (countUpRef.current == null) {
      countUpRef.current = new CountUp(spanRef.current, end, {
        //시작 숫자 설정
        startVal: start,
        //얼마동안 그 숫자를 유지할건지
        duration: duration,
        formattingFn: (num) => String(num).padStart(5, "0"),
      });
      countUpRef
    } else {
      countUpRef.current.update(end);
    }

    return () => {
      // 혹시나 해당 라이브러리를 clean, clear 하는 함수가 있다면 여기서 호출
    };
  }, [start, end, duration]);

  return <span ref={spanRef} />;
}