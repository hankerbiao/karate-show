import * as XLSX from 'xlsx';
import {Match} from "../types";

function readExcelFile(file: File): Promise<Match[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, {type: 'array'});
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const matches: Match[] = jsonData.map((row: any) => ({
                id: row['ID'].toString(),
                name: row['比赛名称'],
                competitor1: {
                    university: row['红方单位'],
                    name: row['红方姓名'],
                },
                competitor2: {
                    university: row['选手2大学'],
                    name: row['蓝方姓名'],
                },
            }));

            resolve(matches);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

export default readExcelFile;