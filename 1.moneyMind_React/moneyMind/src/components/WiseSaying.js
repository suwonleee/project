// ## 명언 데이터, 시작
function getWiseSaying() {
  function getData() {
    const arr = window.wiseSayings.trim().split("\n");

    const data = [];

    arr.forEach((row, index) => {
      const [str, writer] = row.split("//");

      data.push({
        index,
        str,
        writer,
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
    get,
  };
}

const wiseSaying = getWiseSaying();

export function WiseSaying({ index }) {
  const { str, writer } = wiseSaying.get(index);

  return (
    <>
      {str}
      <br />- {writer} -
    </>
  );
}