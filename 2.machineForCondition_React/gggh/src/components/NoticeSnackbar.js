//  EditTodoModal에도, NewTodoForm 에도, BottomOptionDrawer에도,
//  NoticeSnackbar를 사용한다.
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import React from "react";
import { atom, useRecoilState } from "recoil";

const noticeSnackbarInfoAtom = atom({
  key: "app/noticeSnackbarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: "",
  },
});

export function useNoticeSnackbarStatus() {
  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(
    noticeSnackbarInfoAtom
  );

  const opened = noticeSnackbarInfo.opened; //열린지 유무 확인.
  const autoHideDuration = noticeSnackbarInfo.autoHideDuration; //얼마나 후에 자동으로 닫히는지.
  const severity = noticeSnackbarInfo.severity; //심각성(배경 색상)
  const msg = noticeSnackbarInfo.msg; //메세지

  //autoHideDuration : 스낵바가 6초 정도 유지된다. 
  // open 상황을 예시로 함수 만들기. (현재 열려있는지 아닌지.
  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbarInfo({
      opened: true,
      msg,
      severity,
      autoHideDuration,
    });
  };

  const close = () => {
    setNoticeSnackbarInfo({
      ...noticeSnackbarInfo,
      opened: false,
    });
  };

  return {
    opened,
    open,
    close,
    autoHideDuration,
    severity,
    msg,
  };
}

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} variant="filled" />;
});

export function NoticeSnackbar() {
  const status = useNoticeSnackbarStatus();

  return (
    <>
      <Snackbar
        open={status.opened}
        autoHideDuration={status.autoHideDuration}
        onClose={status.close}
      >
      {/* severity={status.severity}는 warining/ success으로 하면 배경 색상이 바뀌는 부분 */}
        <Alert severity={status.severity}>{status.msg}</Alert>
      </Snackbar>
    </>
  );
}