function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}console.clear();

// # 임포트 시작
const { useState, useRef, useEffect, useMemo } = React;

import classNames from "https://cdn.skypack.dev/classnames";

import { produce } from "https://cdn.skypack.dev/immer";

const {
  RecoilRoot,
  atom,
  atomFamily,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue } =
Recoil;

import { recoilPersist } from "https://cdn.skypack.dev/recoil-persist";

const {
  HashRouter: Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useParams,
  useNavigate,
  useLocation } =
ReactRouterDOM;

const {
  colors,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Link,
  Button,
  AppBar,
  Toolbar,
  TextField,
  Chip,
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  Divider,
  Modal,
  Snackbar,
  Alert: MuiAlert,
  Tabs,
  Tab } =
MaterialUI;

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.1.0/countUp.min.js";
// # 임포트 끝

// # 유틸리티 시작

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = n => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds()));

}

// # 유틸리티 끝

// # 리코일 퍼시스트 저장소 시작
const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon" });


const { persistAtom: persistAtomRecords } = recoilPersist({
  key: "persistAtomRecords" });

// # 리코일 퍼시스트 저장소 끝

// # 유틸리티 컴포넌트 시작
// ## 커스텀 스낵바 시작
const noticeSnackbarInfoAtom = atom({
  key: "app/noticeSnackbarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: "" } });



function useNoticeSnackbarStatus() {
  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(
  noticeSnackbarInfoAtom);


  const opened = noticeSnackbarInfo.opened;
  const autoHideDuration = noticeSnackbarInfo.autoHideDuration;
  const severity = noticeSnackbarInfo.severity;
  const msg = noticeSnackbarInfo.msg;

  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbarInfo({
      opened: true,
      msg,
      severity,
      autoHideDuration });

  };

  const close = () => {
    setNoticeSnackbarInfo({
      ...noticeSnackbarInfo,
      opened: false });

  };

  return {
    opened,
    open,
    close,
    autoHideDuration,
    severity,
    msg };

}

const Alert = React.forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement(MuiAlert, _extends({}, props, { ref: ref, variant: "filled" }));
});

function NoticeSnackbar() {
  const status = useNoticeSnackbarStatus();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(Snackbar, {
      open: status.opened,
      autoHideDuration: status.autoHideDuration,
      onClose: status.close }, /*#__PURE__*/

    React.createElement(Alert, { severity: status.severity }, status.msg))));



}
// ## 커스텀 스낵바 끝

// ## 명언 데이터, 시작
function getWiseSaying() {
  function getData() {
    const arr = wiseSayings.trim().split("\n");

    const data = [];

    arr.forEach((row, index) => {
      const [str, writer] = row.split("//");

      data.push({
        index,
        str,
        writer });

    });

    return data;
  }

  function get(index) {
    index = index % data.length;

    return data[index];
  }

  const data = getData();

  return {
    get };

}

const wiseSaying = getWiseSaying();

function WiseSaying({ index }) {
  const { str, writer } = wiseSaying.get(index);

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null,
    str, /*#__PURE__*/
    React.createElement("br", null), "- ", writer, " -"));


}
// ## 명언 데이터, 끝

// ## 카운터 업, 시작
function CountNumber({ start = 0, end = 1000, duration = 2 }) {
  const spanRef = useRef(null);
  const countUpRef = useRef(null);

  useEffect(() => {
    if (countUpRef.current == null) {
      countUpRef.current = new CountUp(spanRef.current, end, {
        startVal: start,
        duration: duration,
        formattingFn: num => String(num).padStart(5, "0") });

      countUpRef.current.start();
    } else {
      countUpRef.current.update(end);
    }

    return () => {
      // 혹시나 해당 라이브러리를 clean, clear 하는 함수가 있다면 여기서 호출
    };
  }, [end]);

  return /*#__PURE__*/React.createElement("span", { ref: spanRef });
}
// ## 카운트 업, 끝

// ## confetti-canvas 시작
const myConfetti = confetti.create(document.querySelector("#confetti-canvas"), {
  resize: true,
  useWorker: true });

// ## confetti-canvas 끝

// # 유틸리티 컴포넌트 끝

// # 비지니스 로직 시작

// ## recordsStatus 시작
const recordsAtom = atom({
  key: "app/recordsAtom",
  default: [],
  effects_UNSTABLE: [persistAtomRecords] });


const doneCountAtom = atom({
  key: "app/doneCountAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon] });


function useRecordsStatus() {
  const goalCount = 10000;
  const [records, setRecords] = useRecoilState(recordsAtom);
  const [doneCount, setDoneCount] = useRecoilState(doneCountAtom);
  const restCount = goalCount - doneCount;

  const id = records.length > 0 ? records[0].id + 1 : 1;

  const saveRecord = addiDoneCount => {
    if (doneCount + addiDoneCount >= goalCount) {
      addiDoneCount = goalCount - doneCount;
    }

    if (addiDoneCount == 0) return;

    setDoneCount(doneCount + addiDoneCount);
    const newRecord = {
      id,
      count: addiDoneCount,
      regDate: dateToStr(new Date()) };

    const newRecords = [newRecord, ...records];
    setRecords(newRecords);
  };

  const findIndexById = id => {
    if (id === null) {
      return -1;
    }

    if (id < 1) {
      return -1;
    }

    return records.findIndex(record => record.id == id);
  };

  const removeRecordById = id => {
    const record = findRecordById(id);

    if (record == null) return;

    const index = findIndexById(id);

    setRecords(
    produce(records, draft => {
      draft.splice(index, 1);
    }));


    setDoneCount(doneCount - record.count);
  };

  const modifyRecordById = (id, count) => {
    const record = findRecordById(id);

    if (record == null) return;

    const diff = record.count - count;
    const index = findIndexById(id);

    setRecords(
    produce(records, draft => {
      draft[index].count = count;
    }));


    setDoneCount(doneCount - diff);
  };

  const findRecordById = id => {
    const index = findIndexById(id);

    if (index == -1) return null;

    return records[index];
  };

  return {
    restCount,
    saveRecord,
    goalCount,
    records,
    removeRecordById,
    findRecordById,
    modifyRecordById };

}
// ## recordsStatus 끝
// # 비지니스 로직 끝

// # 공통 컴포넌트 시작

// ## 기록 모달 시작
function useRecordModalStatus() {
  const [opened, setOpened] = useState(false);

  const close = () => setOpened(false);
  const open = () => setOpened(true);

  return {
    opened,
    close,
    open };

}

function RecordModal({
  status,
  msg,
  initialQuantity = 0,
  saveRecord: _saveRecord,
  cancelRecord: _cancelRecord })
{
  const recordsStatus = useRecordsStatus();

  const [recordCount, setRecordCount] = useState(initialQuantity);

  useEffect(() => {
    setRecordCount(initialQuantity);
  }, [initialQuantity]);

  const changeRecordCount = addiCount => {
    if (addiCount > 0) {
      myConfetti({
        particleCount: addiCount * 10,
        spread: 160
        // any other options from the global
        // confetti function
      });
    }

    const newRecordCount =
    recordCount + addiCount < 0 ? 0 : recordCount + addiCount;
    setRecordCount(newRecordCount);
  };

  const saveRecord = () => {
    if (recordCount == 0) return;

    setRecordCount(0);
    status.close();

    _saveRecord(recordCount);
  };

  const cancelRecord = () => {
    setRecordCount(initialQuantity);
    status.close();

    if (_cancelRecord) _cancelRecord();
  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(Modal, {
      className: "flex justify-center items-center",
      open: status.opened,
      onClose: cancelRecord }, /*#__PURE__*/

    React.createElement("div", { className: "bg-white rounded-[20px] p-7 w-full max-w-lg" }, /*#__PURE__*/
    React.createElement("div", { className: "text-center select-none" }, msg), /*#__PURE__*/
    React.createElement("div", { className: "text-center" }, /*#__PURE__*/
    React.createElement("span", { className: "text-[70px] text-[color:var(--mui-color-primary-main)] font-mono select-none" },
    String(recordCount).padStart(2, "0"))), /*#__PURE__*/


    React.createElement("div", { className: "flex justify-center gap-2" }, /*#__PURE__*/
    React.createElement(Button, { variant: "contained", onClick: () => changeRecordCount(5) }, "+ 5"), /*#__PURE__*/


    React.createElement(Button, { variant: "contained", onClick: () => changeRecordCount(1) }, "+ 1"), /*#__PURE__*/


    React.createElement(Button, { variant: "outlined", onClick: () => changeRecordCount(-5) }, "- 5"), /*#__PURE__*/


    React.createElement(Button, { variant: "outlined", onClick: () => changeRecordCount(-1) }, "- 1")), /*#__PURE__*/




    React.createElement("div", { className: "mt-10 flex justify-center gap-2" }, /*#__PURE__*/
    React.createElement(Button, { variant: "contained", onClick: saveRecord }, "\uC801\uC6A9"), /*#__PURE__*/


    React.createElement(Button, { variant: "outlined", onClick: cancelRecord }, "\uCDE8\uC18C"))))));







}
// ## 기록 모달 끝
// # 공통 컴포넌트 끝

// # 페이지들 시작

// ## 메인 페이지관련 컴포넌트 시작
function RecordAddModal({ status }) {
  const recordsStatus = useRecordsStatus();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();

  const saveRecord = recordCount => {
    recordsStatus.saveRecord(recordCount);
    noticeSnackbarStatus.open(`이번 세트에 ${recordCount}회 수행하셨습니다.`);
  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(RecordModal, {
      msg: "\uC774\uBC88\uC5D0 \uBA87\uD68C \uD558\uC168\uB098\uC694?",
      status: status,
      saveRecord: saveRecord })));



}
// ## 메인 페이지관련 컴포넌트 끝

// ## 메인 페이지 시작
function MainPage() {
  const recordsStatus = useRecordsStatus();

  const recordModalStatus = useRecordModalStatus();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(RecordAddModal, { status: recordModalStatus }), /*#__PURE__*/
    React.createElement("div", { className: "flex-1 flex items-center justify-center" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "text-[70px] text-[color:var(--mui-color-primary-main)] font-mono select-none" }, /*#__PURE__*/
    React.createElement(CountNumber, {
      start: recordsStatus.goalCount,
      end: recordsStatus.restCount,
      duration: 3 })), /*#__PURE__*/


    React.createElement("div", { className: "flex justify-center" }, /*#__PURE__*/
    React.createElement(Button, { variant: "contained", onClick: recordModalStatus.open }, "\uC2A4\uCFFC\uD2B8 \uD69F\uC218 \uAE30\uB85D\uD558\uAE30"))))));







}
// ## 메인 페이지 끝

// ## 히스토리 페이지관련 컴포넌트 시작
function RecordListItem({ record, optionDrawerStatus }) {
  const wiseSayingIndex = record.id % 5 == 0 ? record.id / 5 - 1 : null;

  return /*#__PURE__*/(
    React.createElement("li", { className: "mt-6 sm:mt-8" }, /*#__PURE__*/
    React.createElement("div", { className: "flex gap-2" }, /*#__PURE__*/
    React.createElement(Chip, { label: `${record.id}회차`, variant: "outlined", className: "!pt-1" }), /*#__PURE__*/
    React.createElement(Chip, {
      label: record.regDate,
      variant: "outlined",
      className: "!pt-1",
      color: "primary" })), /*#__PURE__*/


    React.createElement("div", { className: "mt-2 sm:mt-4 shadow rounded-[20px] flex" }, /*#__PURE__*/
    React.createElement("div", { className: "px-5 hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center whitespace-pre-wrap leading-relaxed my-5" },
    record.count, "\uD68C \uC218\uD589",
    wiseSayingIndex !== null && /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("br", null), /*#__PURE__*/
    React.createElement("br", null), /*#__PURE__*/
    React.createElement(WiseSaying, { index: wiseSayingIndex }))), /*#__PURE__*/



    React.createElement(Button, {
      onClick: () => optionDrawerStatus.open(record.id),
      className: "flex-shrink-0 !items-start !rounded-[0_20px_20px_0]",
      color: "inherit" }, /*#__PURE__*/

    React.createElement("span", { className: "text-[#dcdcdc] text-2xl h-[80px] flex items-center" }, /*#__PURE__*/
    React.createElement("i", { className: "fa-solid fa-ellipsis-vertical" }))))));





}

function useRecordOptionDrawerStatus() {
  const [recordId, setRecordId] = useState(null);
  const opened = useMemo(() => recordId !== null, [recordId]);
  const close = () => setRecordId(null);
  const open = id => setRecordId(id);

  return {
    recordId,
    opened,
    close,
    open };

}

function RecordOptionDrawer({ status }) {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const recordsStatus = useRecordsStatus();

  const removeRecord = () => {
    if (!confirm(`${status.recordId}번 기록을 삭제합니다.`)) return;

    recordsStatus.removeRecordById(status.recordId);

    status.close();
    noticeSnackbarStatus.open(
    `${status.recordId}번 기록이 삭제되었습니다.`,
    "info");

  };

  const recordModalStatus = useRecordModalStatus();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(RecordModifyModal, {
      onClose: () => status.close(),
      status: recordModalStatus,
      id: status.recordId }), /*#__PURE__*/

    React.createElement(SwipeableDrawer, {
      anchor: "bottom",
      open: status.opened,
      onClose: status.close,
      onOpen: () => {} }, /*#__PURE__*/

    React.createElement(List, { className: "!py-0" }, /*#__PURE__*/
    React.createElement(ListItem, { className: "!pt-6 !p-5" }, /*#__PURE__*/
    React.createElement("span", { className: "text-[color:var(--mui-color-primary-main)]" },
    status.recordId, "\uBC88"), /*#__PURE__*/

    React.createElement("span", null, "\xA0"), /*#__PURE__*/
    React.createElement("span", null, "\uAE30\uB85D\uC5D0 \uB300\uD574\uC11C")), /*#__PURE__*/

    React.createElement(Divider, null), /*#__PURE__*/
    React.createElement(ListItem, {
      className: "!pt-6 !p-5 !items-baseline",
      button: true,
      onClick: removeRecord }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-trash-can" }), "\xA0", /*#__PURE__*/

    React.createElement("span", null, "\uC0AD\uC81C")), /*#__PURE__*/

    React.createElement(ListItem, {
      className: "!pt-6 !p-5 !items-baseline",
      button: true,
      onClick: recordModalStatus.open }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-pen-to-square" }), "\xA0", /*#__PURE__*/

    React.createElement("span", null, "\uC218\uC815"))))));





}

function RecordModifyModal({ id, status, onClose }) {
  const recordsStatus = useRecordsStatus();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();

  const saveRecord = recordCount => {
    recordsStatus.modifyRecordById(id, recordCount);
    noticeSnackbarStatus.open(
    `${id}번 세트의 기록을 ${recordCount}회로 수정하셨습니다.`);

    if (onClose) onClose();
  };

  const cancelRecord = () => {
    if (onClose) onClose();
  };

  const initialQuantity =
  id === null ? 0 : recordsStatus.findRecordById(id).count;

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(RecordModal, {
      msg: `${id}번 세트의 기록을 몇 회로 수정하시겠습니까?`,
      status: status,
      saveRecord: saveRecord,
      cancelRecord: cancelRecord,
      initialQuantity: initialQuantity })));



}
// ## 히스토리 페이지관련 컴포넌트 끝

// ## 히스토리 페이지 시작
const TodoList__sortIndexAtom = atom({
  key: "app/TodoList__sortIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon] });


function HistoryPage() {
  const recordsStatus = useRecordsStatus();
  const recordOptionDrawerStatus = useRecordOptionDrawerStatus();

  const navigate = useNavigate();

  const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom);

  if (recordsStatus.records.length == 0) {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { className: "flex-1 flex justify-center items-center" }, /*#__PURE__*/
      React.createElement("div", { className: "flex flex-col gap-4" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("span", { className: "text-[color:var(--mui-color-primary-main)]" }, "\uAE30\uB85D"), "\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. U.U"), /*#__PURE__*/




      React.createElement(Button, { variant: "contained", onClick: () => navigate(-1) }, "\uAE30\uB85D\uD558\uB7EC \uAC00\uAE30")))));






  }

  const getSortedRecords = () => {
    if (sortIndex == 0) {
      return [...recordsStatus.records].sort((a, b) => {
        if (a.count == b.count) return 0;
        return a.count < b.count ? 1 : -1;
      });
    } else if (sortIndex == 1) {
      return [...recordsStatus.records].sort((a, b) => {
        if (a.count == b.count) return 0;
        return a.count > b.count ? 1 : -1;
      });
    } else if (sortIndex == 3) {
      return [...recordsStatus.records].sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    return recordsStatus.records;
  };

  const sortedRecords = getSortedRecords();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(RecordOptionDrawer, { status: recordOptionDrawerStatus }), /*#__PURE__*/

    React.createElement(Tabs, {
      variant: "scrollable",
      value: sortIndex,
      onChange: (event, newValue) => {
        setSortIndex(newValue);
      } }, /*#__PURE__*/

    React.createElement(Tab, {
      className: "flex-grow !max-w-[none] px-4",
      label: /*#__PURE__*/
      React.createElement("span", { className: "flex items-baseline" }, /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-arrow-down-9-1" }), /*#__PURE__*/
      React.createElement("span", { className: "mr-2 whitespace-nowrap" }, "\uAE30\uB85D\uC21C"), /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-sort-down relative top-[-3px]" })),


      value: 0 }), /*#__PURE__*/

    React.createElement(Tab, {
      className: "flex-grow !max-w-[none] px-4",
      label: /*#__PURE__*/
      React.createElement("span", { className: "flex items-baseline" }, /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-arrow-up-1-9" }), /*#__PURE__*/
      React.createElement("span", { className: "mr-2 whitespace-nowrap" }, "\uAE30\uB85D\uC21C"), /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-sort-up relative top-[3px]" })),


      value: 1 }), /*#__PURE__*/

    React.createElement(Tab, {
      className: "flex-grow !max-w-[none] px-4",
      label: /*#__PURE__*/
      React.createElement("span", { className: "flex items-baseline" }, /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-pen mr-2" }), /*#__PURE__*/
      React.createElement("span", { className: "mr-2 whitespace-nowrap" }, "\uB0A0\uC9DC\uC21C"), /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-sort-down relative top-[-3px]" })),


      value: 2 }), /*#__PURE__*/

    React.createElement(Tab, {
      className: "flex-grow !max-w-[none] px-4",
      label: /*#__PURE__*/
      React.createElement("span", { className: "flex items-baseline" }, /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-pen mr-2" }), /*#__PURE__*/
      React.createElement("span", { className: "mr-2 whitespace-nowrap" }, "\uB0A0\uC9DC\uC21C"), /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-sort-up relative top-[3px]" })),


      value: 3 })), /*#__PURE__*/



    React.createElement("div", { className: "flex-1" }, /*#__PURE__*/
    React.createElement("ul", { className: "px-6 sm:px-8 pb-6 sm:pb-8" },
    sortedRecords.map((record, index) => /*#__PURE__*/
    React.createElement(RecordListItem, {
      key: index,
      record: record,
      index: index,
      optionDrawerStatus: recordOptionDrawerStatus }))))));






}

// ## 히스토리 페이지 끝

// # 페이지들 끝

// # 앱 세팅 시작
function App() {
  const location = useLocation();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(AppBar, { position: "fixed" }, /*#__PURE__*/
    React.createElement(Toolbar, null, /*#__PURE__*/
    React.createElement("div", { className: "flex-1" }), /*#__PURE__*/
    React.createElement(NavLink, {
      to: "/main",
      className: "font-bold select-none self-stretch flex items-center" }, "\uC2A4\uCFFC\uD2B8 \uCC4C\uB9B0\uC9C0"), /*#__PURE__*/



    React.createElement("div", { className: "flex-1 self-stretch flex justify-end" },
    location.pathname != "/history" && /*#__PURE__*/
    React.createElement(NavLink, { className: "select-none flex items-center", to: "/history" }, "\uD788\uC2A4\uD1A0\uB9AC"),



    location.pathname == "/history" && /*#__PURE__*/
    React.createElement(NavLink, { className: "select-none flex items-center", to: "/main" }, "\uB4A4\uB85C\uAC00\uAE30")))), /*#__PURE__*/






    React.createElement(Toolbar, null), /*#__PURE__*/
    React.createElement(NoticeSnackbar, null), /*#__PURE__*/
    React.createElement(Routes, null, /*#__PURE__*/
    React.createElement(Route, { path: "/main", element: /*#__PURE__*/React.createElement(MainPage, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "/history", element: /*#__PURE__*/React.createElement(HistoryPage, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "*", element: /*#__PURE__*/React.createElement(Navigate, { to: "/main" }) }))));



}

const muiThemePaletteKeys = [
"background",
"common",
"error",
"grey",
"info",
"primary",
"secondary",
"success",
"text",
"warning"];


function Root() {
  // Create a theme instance.
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"] },

    // 앱 테마
    palette: {
      primary: {
        main: "#7FCA93",
        contrastText: "#ffffff" } } });




  useEffect(() => {
    const r = document.querySelector(":root");

    muiThemePaletteKeys.forEach(paletteKey => {
      const themeColorObj = theme.palette[paletteKey];

      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, []);

  return /*#__PURE__*/(
    React.createElement(RecoilRoot, null, /*#__PURE__*/
    React.createElement(Router, null, /*#__PURE__*/
    React.createElement(ThemeProvider, { theme: theme }, /*#__PURE__*/
    React.createElement(CssBaseline, null), /*#__PURE__*/
    React.createElement(App, null)))));




}

ReactDOM.render( /*#__PURE__*/React.createElement(Root, null), document.getElementById("root"));
// # 앱 세팅 끝