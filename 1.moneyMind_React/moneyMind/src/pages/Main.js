import { Button } from "@mui/material";
import { CountNumber } from "../components/CountUp";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { RecordModal, useRecordModalStatus } from "../components/RecordModal";
import { useRecordsStatus } from "../hooks";

function RecordAddModal({ status }) {
  const recordsStatus = useRecordsStatus();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();

  const saveRecord = (recordCount) => {
    recordsStatus.saveRecord(recordCount);
    noticeSnackbarStatus.open(`이번 세트에 ${recordCount}회 수행하셨습니다.`);
  };

  return (
    <>
      <RecordModal
        msg="이번에 몇회 하셨나요?"
        status={status}
        saveRecord={saveRecord}
      />
    </>
  );
}
// ## 메인 페이지관련 컴포넌트 끝

// ## 메인 페이지 시작
function Main() {
  const recordsStatus = useRecordsStatus();

  const recordModalStatus = useRecordModalStatus();

  return (
    <>
      <RecordAddModal status={recordModalStatus} />
      <div className="flex-1 flex items-center justify-center">
        <div>
          <div className="text-[70px] text-[color:var(--mui-color-primary-main)] font-mono select-none">
            <CountNumber
              start={recordsStatus.goalCount}
              end={recordsStatus.restCount}
              duration={3}
            />
          </div>
          <div className="flex justify-center">
            <Button variant="contained" onClick={recordModalStatus.open}>
              스쿼트 횟수 기록하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;