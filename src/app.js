import "./app.css";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";

function timeout(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), delay);
    });
}

function parseCsvLine(line) {
    return line.split(",");
}

function parseCsv(text) {
    const rows = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line)
        .map(parseCsvLine);

    if (rows.length === 0) {
        return [];
    }

    const columns = rows[0];
    return rows.slice(1).map(row => {
        const item = {}
        columns.forEach((column, index) => {
            if (row.length >= columns.length) {
                item[column] = row[index];
            }
        });
        return item;
    });
}

class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>Pisteet</h1>
                <Scores scores={this.props.scores} />
            </div>
        );
    }
}

class Scores extends React.Component {
    render() {
        var scores = this.props.scores.map(item => {
            return (
                <tr className="row item">
                    <td className="cell">{item.name}</td>
                    <td className="cell">{item.location}</td>
                    <td className="cell">{item.score}</td>
                </tr>
            );
        });

        return (
            <table className="scores">
                <tr className="row header">
                    <th className="cell">Nimi</th>
                    <th className="cell">Pöytäpaikka</th>
                    <th className="cell">Pisteet</th>
                </tr>
                {scores}
            </table>
        );
    }
}

function render(scores=[]) {
    ReactDOM.render(<Main scores={scores} />, document.getElementById("main"));
}

function refresh(defaultUrl) {
    const url = location.hash.match(/^#?(.*)$/)[1] || defaultUrl;
    return fetch(url)
        .then(response => response.text())
        .then(text => parseCsv(text))
        .then(csv => render(csv));
}

function poll(defaultUrl, interval) {
    refresh(defaultUrl)
        .then(() => timeout(interval))
        .then(() => poll(defaultUrl, interval));
}

function main(defaultUrl="https://raw.githubusercontent.com/ouspg/vecto-ctf/master/score.csv", interval=5000) {
    render();

    poll(defaultUrl, interval);

    window.addEventListener("hashchange", () => {
        refresh(defaultUrl);
    });
};

main();
