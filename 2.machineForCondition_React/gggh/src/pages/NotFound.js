import { read, utils } from "https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs";

// import { Box } from '@mui/material';

/* const NotFound = async () => {
    try {
        const res = await fetch('../db/notebookInfo.xlsx');
        if (!res.ok) {
        throw new Error(`xlsx file 요청 실패 ${e.message}`);
        }
        const buffer = await res.arrayBuffer()
        const workbook = read(buffer, {type: 'array'});

        return parseXLSX(workbook);
        } catch (e) {
        throw new Error(e);
    }
    // return (
    //     <Box 
    //         className="flex justify-center items-center" 
    //         v>
    //         404 Error
    //     </Box>
    // );
}
export default NotFound; */

const NotFound = async () => {
    try {
        const res = await fetch('../db/geo.xlsx');
        if (!res.ok) {
            const e = new Error("xlsx file 요청 실패");

            throw e;
        }
        const buffer = await res.arrayBuffer()
        const workbook = read(buffer, {type: 'array'});

        return parseXLSX(workbook);
    } catch (e) {
        throw new Error(e);
    }
    }

    const parseXLSX = (workbook) => {
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = utils.sheet_to_row_object_array(sheet);
    const geocoding = {};

    rows.forEach((row) => {
        const address1 = row['1단계'];
        const address2 = row['2단계'];
        const address3 = row['3단계'];
        const coordinate = {
        lat: row['경도(시)'],
        lon: row['위도(시)'],
        };

        if (!geocoding[address1]) {
        geocoding[address1] = coordinate;
        } else if (!geocoding[address1][address2]) {
        geocoding[address1][address2] = coordinate;
        } else {
        geocoding[address1][address2][address3] = coordinate;
        }
    });

    return geocoding;
    };
export default NotFound;
