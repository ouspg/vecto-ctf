function parseLine(line) {
    return line.split(",");
}

export default function(text) {
    const rows = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line)
        .map(parseLine);

    if (rows.length === 0) {
        return [];
    }

    const columns = rows[0];
    return rows.slice(1).map(row => {
        const item = {};
        columns.forEach((column, index) => {
            if (row.length >= columns.length) {
                item[column] = row[index];
            }
        });
        return item;
    });
}
