import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon",
});

const { persistAtom: persistAtomRecords } = recoilPersist({
  key: "persistAtomRecords",
});

export const recordsAtom = atom({
  key: "app/recordsAtom",
  default: [],
  effects_UNSTABLE: [persistAtomRecords],
});

export const doneCountAtom = atom({
  key: "app/doneCountAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon],
});