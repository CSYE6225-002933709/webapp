import * as fs from 'fs';
import {parse} from 'csv-parse';

export const read_csv = (filename) => {

    const rows = [];

    fs.createReadStream(filename)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
        rows.push(row);
        console.log(row);
    })
    .on("end", ()=> {
        console.log('file read completed');        
        return rows;
    })
    .on('error', (error) => {
        console.log(error);
    })
}

export const init_user_data = (filename) => {

    const rows = read_csv(filename);
    console.log(rows);
}