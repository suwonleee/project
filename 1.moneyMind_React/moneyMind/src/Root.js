import { HashRouter } from "react-router-dom"
import { RecoilRoot } from 'recoil';
import App from "./App";

function Root() {
  return (
    <>
      <RecoilRoot>
        <HashRouter>
          <App />
        </HashRouter>
      </RecoilRoot>
    </>
  );
}

export default Root;