import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { myConfetti } from "../utils";
//confetti 라이브러리 불러오기
// npmjs.com/package/js-confetti

// 완료한 숫자를 입력하면 그걸 받아서 기록 해주는 함수
export function useRecordModalStatus() {

  const [opened, setOpened] = useState(false);

  const close = () => setOpened(false);
  const open = () => setOpened(true);

  return {
    opened,
    close,
    open,
  };
}

// 함수에 {} 를 넣는 경우는 두개를 같다고 생각하면 된다.
// function({isActive}) 
// function (arg) { const isActive = args.isActive;} 

//! ***********************
//! 기록 해주는 동작 함수 완전 처음 
export function RecordModal({
  //todo 함수에 담아주는 변수
  status,
  msg,
  initialQuantity = 0,  //초기 개수
  saveRecord: _saveRecord,  //숫자 저장해주는 값
  cancelRecord: _cancelRecord,  //값을 입력 안 하고 취소하면 나타나는 값  
}) {
  const [recordCount, setRecordCount] = useState(initialQuantity);

  useEffect(() => {
    setRecordCount(initialQuantity);
  }, [initialQuantity]); //initialQuantity가 변할 때 마다 적용되는 useEffect

  const changeRecordCount = (addiCount) => {
    if (addiCount > 0) {
      //0을 초과할 시 축하 이모티콘 같은게 펑  -> confetti
      myConfetti({
        //세부 옵션 조정
        particleCount: addiCount * 10,
        spread: 160,
        // any other options from the global
        // confetti function
      });
    }

    const newRecordCount =
    //원래 기록된 카운트(recordCount) + 새로 입력받은 카운트(addiCount)를 더 해주기
    // 0보다 작은게 true라면 0 유지 , 0보다 크다면 값 바꿔주기
      recordCount + addiCount < 0 ? 0 : recordCount + addiCount;
    setRecordCount(newRecordCount); //useState에 새 값으로 교체
  };
  
  // ! 기록된 값을 저장해주는 함수
  const saveRecord = () => {
    // 기록 값이 0인 경우
    if (recordCount === 0) return;

    // useState 다음번에 새 값(0) 담아주고
    setRecordCount(0);

    // 상태창 닫아주기 (기록 완료 했으니깐)
    status.close();

    // 
    _saveRecord(recordCount);
  };

  // 세부 창(자식 컴포넌트)에서 취소를 누를 때 메뉴 창(부모 창)도 같이 취소되게 만들기
  const cancelRecord = () => {
    setRecordCount(initialQuantity);
    status.close();

    //만약 _cancelRecord 있다면 _cancelRecord() 이걸 실행해라
    if (_cancelRecord) _cancelRecord();
  };

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={status.opened}
        onClose={cancelRecord}
      >
        <div className="bg-white rounded-[20px] p-7 w-full max-w-lg">
          <div className="text-center select-none">{msg}</div>
          <div className="text-center">
            <span className="text-[70px] text-[color:var(--mui-color-primary-main)] font-mono select-none">
              {String(recordCount).padStart(2, "0")}
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="contained" onClick={() => changeRecordCount(5)}>
              + 5
            </Button>
            <Button variant="contained" onClick={() => changeRecordCount(1)}>
              + 1
            </Button>
            <Button variant="outlined" onClick={() => changeRecordCount(-5)}>
              - 5
            </Button>
            <Button variant="outlined" onClick={() => changeRecordCount(-1)}>
              - 1
            </Button>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            <Button variant="contained" onClick={saveRecord}>
              적용
            </Button>
            <Button variant="outlined" onClick={cancelRecord}>
              취소
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}