import * as fs from 'fs';
import {parse} from 'csv-parse';

export const read_csv = async (filename, rows) => {    

    fs.createReadStream(filename)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
        rows.push(row);
        console.log(row);
    })
    .on("end", ()=> {
        console.log('file read completed');                  
    })
    .on('error', (error) => {
        console.log(error);
    })

    return rows;
}

export const init_user_data = async (filename) => {

    var rows = [];

    rows = await read_csv(filename, rows);

    console.log(rows);
    
}
