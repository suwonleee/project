
import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";

export function CountNumber({ start = 0, end = 1000, duration = 2 }) {
  const spanRef = useRef(null);
  const countUpRef = useRef(null);

  useEffect(() => {
    if (countUpRef.current == null) {
      countUpRef.current = new CountUp(spanRef.current, end, {
        startVal: start,
        duration: duration,
        formattingFn: (num) => String(num).padStart(5, "0"),
      });
      countUpRef.current.start();
    } else {
      countUpRef.current.update(end);
    }

    return () => {
      // 혹시나 해당 라이브러리를 clean, clear 하는 함수가 있다면 여기서 호출
    };
  }, [start, end, duration]);

  return <span ref={spanRef} />;
}