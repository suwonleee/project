//https://codepen.io/suwonleee/pen/bGxRbgV?editors=0010

//! 0. 임포트 (import)

//! 1. 유틸리티 (utillity)

//! 2. 리코일 퍼시스트 저장소 (recoil persist)

//! 3. 유틸리티 컴포넌트 (utilliy components)
//todo ## 3-1. 커스텀 스낵바
//todo ## 3-2. 명언 데이터
//todo ## 3-3. 카운터 업, 
//todo ## 3-4. confetti-canvas 

//! 4. 비지니스 로직 
//todo ## 4-1. recordsStatus 

//! # 5. 공통 컴포넌트 
//todo ## 5-1. 기록
//todo ## 5-2. 기록 모달 창 세부 기술


//! # 6. 페이지들
//todo ## 6-1. 메인 페이지관련 컴포넌트
//todo ## 6-2. 메인 페이지
//todo ## 6-3.히스토리 페이지관련 컴포넌트
//todo ## 6-4. 히스토리 페이지

//! # 7. 앱 세팅


//----------------------------------------------------
//! # 0. 임포트 시작
const { useState, useRef, useEffect, useMemo } = React;

import classNames from "https://cdn.skypack.dev/classnames";

import { produce } from "https://cdn.skypack.dev/immer";

const {
  RecoilRoot,
  atom,
  atomFamily,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue
} = Recoil;

import { recoilPersist } from "https://cdn.skypack.dev/recoil-persist";

const {
  HashRouter: Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useParams,
  useNavigate,
  useLocation
} = ReactRouterDOM;

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
  Tab
} = MaterialUI;

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.1.0/countUp.min.js";
// # 임포트 끝

// ! # 1. 유틸리티 시작----------------------------

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
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
    pad(d.getSeconds())
  );
}

// # 유틸리티 끝

//! # 2. 리코일 퍼시스트 저장소 시작----------------------------
const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon"
});

const { persistAtom: persistAtomRecords } = recoilPersist({
  key: "persistAtomRecords"
});
// # 리코일 퍼시스트 저장소 끝

//! # 유틸리티 컴포넌트 시작
//todo ## 커스텀 스낵바 시작
const noticeSnackbarInfoAtom = atom({
  key: "app/noticeSnackbarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: ""
  }
});

function useNoticeSnackbarStatus() {
  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(
    noticeSnackbarInfoAtom
  );

  const opened = noticeSnackbarInfo.opened;
  const autoHideDuration = noticeSnackbarInfo.autoHideDuration;
  const severity = noticeSnackbarInfo.severity;
  const msg = noticeSnackbarInfo.msg;

  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbarInfo({
      opened: true,
      msg,
      severity,
      autoHideDuration
    });
  };

  const close = () => {
    setNoticeSnackbarInfo({
      ...noticeSnackbarInfo,
      opened: false
    });
  };

  return {
    opened,
    open,
    close,
    autoHideDuration,
    severity,
    msg
  };
}

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} variant="filled" />;
});

function NoticeSnackbar() {
  const status = useNoticeSnackbarStatus();

  return (
    <>
      <Snackbar
        open={status.opened}
        autoHideDuration={status.autoHideDuration}
        onClose={status.close}
      >
        <Alert severity={status.severity}>{status.msg}</Alert>
      </Snackbar>
    </>
  );
}
// ## 커스텀 스낵바 끝

//todo ## 명언 데이터, 시작
function getWiseSaying() {
  function getData() {
    const arr = wiseSayings.trim().split("\n");

    const data = [];

    arr.forEach((row, index) => {
      const [str, writer] = row.split("//");

      data.push({
        index,
        str,
        writer
      });
    });

    return data;
  }

  function get(index) {
    index = index % data.length;

    return data[index];
  }

  const data = getData();

  return {
    get
  };
}

const wiseSaying = getWiseSaying();

function WiseSaying({ index }) {
  const { str, writer } = wiseSaying.get(index);

  return (
    <>
      {str}
      <br />- {writer} -
    </>
  );
}
// ## 명언 데이터, 끝

//todo ## 카운터 업, 시작
function CountNumber({ start = 0, end = 1000, duration = 2 }) {
  const spanRef = useRef(null);
  const countUpRef = useRef(null);

  useEffect(() => {
    if (countUpRef.current == null) {
      countUpRef.current = new CountUp(spanRef.current, end, {
        startVal: start,
        duration: duration,
        formattingFn: (num) => String(num).padStart(5, "0")
      });
      countUpRef.current.start();
    } else {
      countUpRef.current.update(end);
    }

    return () => {
      // 혹시나 해당 라이브러리를 clean, clear 하는 함수가 있다면 여기서 호출
    };
  }, [end]);

  return <span ref={spanRef} />;
}
// ## 카운트 업, 끝

//todo ## confetti-canvas 시작
const myConfetti = confetti.create(document.querySelector("#confetti-canvas"), {
  resize: true,
  useWorker: true
});
// ## confetti-canvas 끝
// # 유틸리티 컴포넌트 끝

//! # 비지니스 로직 시작

//todo ## recordsStatus 시작
const recordsAtom = atom({
  key: "app/recordsAtom",
  default: [],
  effects_UNSTABLE: [persistAtomRecords]
});

const doneCountAtom = atom({
  key: "app/doneCountAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon]
});

function useRecordsStatus() {
  const goalCount = 10000;
  const [records, setRecords] = useRecoilState(recordsAtom);
  const [doneCount, setDoneCount] = useRecoilState(doneCountAtom);
  const restCount = goalCount - doneCount;

  const id = records.length > 0 ? records[0].id + 1 : 1;

  const saveRecord = (addiDoneCount) => {
    if (doneCount + addiDoneCount >= goalCount) {
      addiDoneCount = goalCount - doneCount;
    }

    if (addiDoneCount == 0) return;

    setDoneCount(doneCount + addiDoneCount);
    const newRecord = {
      id,
      count: addiDoneCount,
      regDate: dateToStr(new Date())
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

    return records.findIndex((record) => record.id == id);
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
    modifyRecordById
  };
}
// ## recordsStatus 끝
// # 비지니스 로직 끝


//! # 공통 컴포넌트 시작
//todo ## 기록 모달 상태
function useRecordModalStatus() {
  //기록 모달 상태를 활용할 때 ! 
  const [opened, setOpened] = useState(false);

  //닫힘 & 열림 상태에 따라 변경
  const close = () => setOpened(false);
  const open = () => setOpened(true);

  return {
    opened,
    close,
    open
  };
}

//todo ## 기록 모달 창 세부 기술
function RecordModal({
  status,
  msg,
  initialQuantity = 0,
  saveRecord: _saveRecord,
  cancelRecord: _cancelRecord
}) {
  const recordsStatus = useRecordsStatus();

  const [recordCount, setRecordCount] = useState(initialQuantity);

  useEffect(() => {
    setRecordCount(initialQuantity);
  }, [initialQuantity]);

  // 기록된 값 변경
  const changeRecordCount = (addiCount) => {
    if (addiCount > 0) {
      myConfetti({
        particleCount: addiCount * 10,
        spread: 160
      });
    }
    const newRecordCount =
      recordCount + addiCount < 0 ? 0 : recordCount + addiCount;
    setRecordCount(newRecordCount);
  };

  // 값 저장
  const saveRecord = () => {
    if (recordCount == 0) return;

    setRecordCount(0);
    status.close();

    _saveRecord(recordCount);
  };

  // 값 취소
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
          {/* msg = 메시지(이번에 몇회 하셨나요?) */}
          <div className="text-center select-none">{msg}</div>
          {/* 정 가운데 숫자 기록 칸  -> recordCount  */}
          <div className="text-center">
            <span className="text-[70px] text-[color:var(--mui-color-primary-main)] font-mono select-none">
            {/* 시작 값을 두자리(2)수, 0으로 설정 */}
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
// ## 기록 모달 끝
// # 공통 컴포넌트 끝

//! # 페이지들 시작
//todo ## 메인 페이지관련 컴포넌트 시작
function RecordAddModal({ status }) {
  const recordsStatus = useRecordsStatus();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();

  //기록이 완료되면 스낵바에서 '이번 세트에 __회 수행하셨습니다.'
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

//todo ## 메인 페이지 시작
function MainPage() {
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
// ## 메인 페이지 끝

//todo ## 히스토리 페이지관련 컴포넌트 시작
function RecordListItem({ record, optionDrawerStatus }) {
  const wiseSayingIndex = record.id % 5 == 0 ? record.id / 5 - 1 : null;

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
    open
  };
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

//todo ## 히스토리 페이지 시작
const TodoList__sortIndexAtom = atom({
  key: "app/TodoList__sortIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon]
});

function HistoryPage() {
  const recordsStatus = useRecordsStatus();
  const recordOptionDrawerStatus = useRecordOptionDrawerStatus();

  const navigate = useNavigate();

  const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom);

  if (recordsStatus.records.length == 0) {
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

// ## 히스토리 페이지 끝

// # 페이지들 끝

//! # 앱 세팅 시작
function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <NavLink
            to="/main"
            className="font-bold select-none self-stretch flex items-center"
          >
            스쿼트 챌린지
          </NavLink>
          <div className="flex-1 self-stretch flex justify-end">
            {location.pathname != "/history" && (
              <NavLink className="select-none flex items-center" to="/history">
                히스토리
              </NavLink>
            )}
            {location.pathname == "/history" && (
              <NavLink className="select-none flex items-center" to="/main">
                뒤로가기
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
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
  "warning"
];

function Root() {
  // Create a theme instance.
  const theme = createTheme({
    typography: {
      fontFamily: ["GmarketSansMedium"]
    },
    // 앱 테마
    palette: {
      primary: {
        main: "#7FCA93",
        contrastText: "#ffffff"
      }
    }
  });

  useEffect(() => {
    const r = document.querySelector(":root");

    muiThemePaletteKeys.forEach((paletteKey) => {
      const themeColorObj = theme.palette[paletteKey];

      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, []);

  return (
    <RecoilRoot>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Router>
    </RecoilRoot>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
// # 앱 세팅 끝