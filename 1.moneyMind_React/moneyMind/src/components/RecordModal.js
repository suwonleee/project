import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { myConfetti } from "../utils";

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

export function RecordModal({
  status,
  msg,
  initialQuantity = 0,
  saveRecord: _saveRecord,
  cancelRecord: _cancelRecord,
}) {
  const [recordCount, setRecordCount] = useState(initialQuantity);

  useEffect(() => {
    setRecordCount(initialQuantity);
  }, [initialQuantity]);

  const changeRecordCount = (addiCount) => {
    if (addiCount > 0) {
      myConfetti({
        particleCount: addiCount * 10,
        spread: 160,
        // any other options from the global
        // confetti function
      });
    }

    const newRecordCount =
      recordCount + addiCount < 0 ? 0 : recordCount + addiCount;
    setRecordCount(newRecordCount);
  };

  const saveRecord = () => {
    if (recordCount === 0) return;

    setRecordCount(0);
    status.close();

    _saveRecord(recordCount);
  };

  const cancelRecord = () => {
    setRecordCount(initialQuantity);
    status.close();

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