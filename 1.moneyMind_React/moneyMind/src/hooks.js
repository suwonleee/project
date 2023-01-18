import produce from "immer";
import { useRecoilState } from "recoil";
import { doneCountAtom, recordsAtom } from "./atoms";
import { dateToStr } from "./utils";

export function useRecordsStatus() {
  const goalCount = 10000;
  const [records, setRecords] = useRecoilState(recordsAtom);
  const [doneCount, setDoneCount] = useRecoilState(doneCountAtom);
  const restCount = goalCount - doneCount;

  const id = records.length > 0 ? records[0].id + 1 : 1;

  const saveRecord = (addiDoneCount) => {
    if (doneCount + addiDoneCount >= goalCount) {
      addiDoneCount = goalCount - doneCount;
    }

    if (addiDoneCount === 0) return;

    setDoneCount(doneCount + addiDoneCount);
    const newRecord = {
      id,
      count: addiDoneCount,
      regDate: dateToStr(new Date()),
    };
    const newRecords = [newRecord, ...records];
    setRecords(newRecords);
  };

  const findIndexById = (id) => {
    if (id === null) {
      return -1;
    }

    if (id < 1) {
      return -1;
    }

    return records.findIndex((record) => record.id === id);
  };

  const removeRecordById = (id) => {
    const record = findRecordById(id);

    if (record == null) return;

    const index = findIndexById(id);

    setRecords(
      produce(records, (draft) => {
        draft.splice(index, 1);
      })
    );

    setDoneCount(doneCount - record.count);
  };

  const modifyRecordById = (id, count) => {
    const record = findRecordById(id);

    if (record == null) return;

    const diff = record.count - count;
    const index = findIndexById(id);

    setRecords(
      produce(records, (draft) => {
        draft[index].count = count;
      })
    );

    setDoneCount(doneCount - diff);
  };

  const findRecordById = (id) => {
    const index = findIndexById(id);

    if (index === -1) return null;

    return records[index];
  };

  return {
    restCount,
    saveRecord,
    goalCount,
    records,
    removeRecordById,
    findRecordById,
    modifyRecordById,
  };
}