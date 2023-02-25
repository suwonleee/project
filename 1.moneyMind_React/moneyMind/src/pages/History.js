import {
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  Tab,
  Tabs,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { persistAtomCommon } from "../atoms";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { RecordModal, useRecordModalStatus } from "../components/RecordModal";
import { WiseSaying } from "../components/WiseSaying";
import { useRecordsStatus } from "../hooks";

function RecordListItem({ record, optionDrawerStatus }) {
  const wiseSayingIndex = record.id % 5 === 0 ? record.id / 5 - 1 : null;

  return (
    <li className="mt-6 sm:mt-8">
      <div className="flex gap-2">
        <Chip label={`${record.id}회차`} variant="outlined" className="!pt-1" />
        <Chip
          label={record.regDate}
          variant="outlined"
          className="!pt-1"
          color="primary"
        />
      </div>

      {/* //! 기록 페이지 내 라운드   */}
      <div className="mt-2 sm:mt-4 shadow rounded-[20px] flex">
        <div className="px-5 hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center whitespace-pre-wrap leading-relaxed my-5">
          {record.count}회 수행
          {wiseSayingIndex !== null && (
            <>
              <br />
              <br />
              <WiseSaying index={wiseSayingIndex} />
            </>
          )}
        </div>
        <Button
          onClick={() => optionDrawerStatus.open(record.id)}
          className="flex-shrink-0 !items-start !rounded-[0_20px_20px_0]"
          color="inherit"
        >
          <span className="text-[#dcdcdc] text-2xl h-[80px] flex items-center">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </span>
        </Button>
      </div>
    </li>
  );
}

function useRecordOptionDrawerStatus() {
  const [recordId, setRecordId] = useState(null);
  const opened = useMemo(() => recordId !== null, [recordId]);
  const close = () => setRecordId(null);
  const open = (id) => setRecordId(id);

  return {
    recordId,
    opened,
    close,
    open,
  };
}

function RecordOptionDrawer({ status }) {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const recordsStatus = useRecordsStatus();

  const removeRecord = () => {
    if (!window.confirm(`${status.recordId}번 기록을 삭제합니다.`)) return;

    recordsStatus.removeRecordById(status.recordId);

    status.close();
    noticeSnackbarStatus.open(
      `${status.recordId}번 기록이 삭제되었습니다.`,
      "info"
    );
  };

  const recordModalStatus = useRecordModalStatus();

  return (
    <>
      <RecordModifyModal
        onClose={() => status.close()}
        status={recordModalStatus}
        id={status.recordId}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={status.opened}
        onClose={status.close}
        onOpen={() => {}}
      >
        <List className="!py-0">
          <ListItem className="!pt-6 !p-5">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {status.recordId}번
            </span>
            <span>&nbsp;</span>
            <span>기록에 대해서</span>
          </ListItem>
          <Divider />
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            onClick={removeRecord}
          >
            <i className="fa-solid fa-trash-can"></i>
            &nbsp;
            <span>삭제</span>
          </ListItem>
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            onClick={recordModalStatus.open}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            &nbsp;
            <span>수정</span>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}

function RecordModifyModal({ id, status, onClose }) {
  const recordsStatus = useRecordsStatus();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();

  const saveRecord = (recordCount) => {
    recordsStatus.modifyRecordById(id, recordCount);
    noticeSnackbarStatus.open(
      `${id}번 세트의 기록을 ${recordCount}회로 수정하셨습니다.`
    );
    if (onClose) onClose();
  };

  const cancelRecord = () => {
    if (onClose) onClose();
  };

  const initialQuantity =
    id === null ? 0 : recordsStatus.findRecordById(id).count;

  return (
    <>
      <RecordModal
        msg={`${id}번 세트의 기록을 몇 회로 수정하시겠습니까?`}
        status={status}
        saveRecord={saveRecord}
        cancelRecord={cancelRecord}
        initialQuantity={initialQuantity}
      />
    </>
  );
}
// ## 히스토리 페이지관련 컴포넌트 끝

// ## 히스토리 페이지 시작
const TodoList__sortIndexAtom = atom({
  key: "app/TodoList__sortIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon],
});

function History() {
  const recordsStatus = useRecordsStatus();
  const recordOptionDrawerStatus = useRecordOptionDrawerStatus();

  const navigate = useNavigate();

  const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom);

  if (recordsStatus.records.length === 0) {
    return (
      <>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[color:var(--mui-color-primary-main)]">
                기록
              </span>
              이 없습니다. U.U
            </div>
            <Button variant="contained" onClick={() => navigate(-1)}>
              기록하러 가기
            </Button>
          </div>
        </div>
      </>
    );
  }

  const getSortedRecords = () => {
    if (sortIndex === 0) {
      return [...recordsStatus.records].sort((a, b) => {
        if (a.count === b.count) return 0;
        return a.count < b.count ? 1 : -1;
      });
    } else if (sortIndex === 1) {
      return [...recordsStatus.records].sort((a, b) => {
        if (a.count === b.count) return 0;
        return a.count > b.count ? 1 : -1;
      });
    } else if (sortIndex === 3) {
      return [...recordsStatus.records].sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    return recordsStatus.records;
  };

  const sortedRecords = getSortedRecords();

  return (
    <>
      <RecordOptionDrawer status={recordOptionDrawerStatus} />

      <Tabs
        variant="scrollable"
        value={sortIndex}
        onChange={(event, newValue) => {
          setSortIndex(newValue);
        }}
      >
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-arrow-down-9-1"></i>
              <span className="mr-2 whitespace-nowrap">기록순</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={0}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-arrow-up-1-9"></i>
              <span className="mr-2 whitespace-nowrap">기록순</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={1}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">날짜순</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={2}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">날짜순</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={3}
        />
      </Tabs>

      <div className="flex-1">
        <ul className="px-6 sm:px-8 pb-6 sm:pb-8">
          {sortedRecords.map((record, index) => (
            <RecordListItem
              key={index}
              record={record}
              index={index}
              optionDrawerStatus={recordOptionDrawerStatus}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default History;