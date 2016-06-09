import "./app.css";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import * as colors from "d3-scale-chromatic";

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
                <h1 className="heading">Pisteet</h1>
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

function render(element, scores=[]) {
    ReactDOM.render(<Main scores={scores} />, element);
}

function refresh(element, defaultUrl) {
    const url = location.hash.match(/^#?(.*)$/)[1] || defaultUrl;
    return fetch(url)
        .then(response => response.text())
        .then(text => parseCsv(text))
        .then(csv => render(element, csv));
}

function poll(element, defaultUrl, interval) {
    refresh(element, defaultUrl)
        .then(() => timeout(interval))
        .then(() => poll(element, defaultUrl, interval));
}

function main(element, defaultUrl="https://raw.githubusercontent.com/ouspg/vecto-ctf/master/score.csv", interval=5000) {
    render(element);

    poll(element, defaultUrl, interval);

    window.addEventListener("hashchange", () => {
        refresh(element, defaultUrl);
    });
}

function background(canvas) {
    const ctx = canvas.getContext("2d");
    const maxR = 20;

    let bubbles = [];
    let drawn = [];
    let width = canvas.width;
    let height = canvas.height;

    setInterval(() => {
        bubbles.push({
            "offset": Math.random(),
            "t": Date.now(),
            "x": -maxR,
            "y": height * Math.random(),
            "z": 1.0 + 3 * Math.random(),
            "color": colors.interpolatePuBuGn(Math.random())
        });
    }, 20);

    function redraw() {
        const now = Date.now();
        const minAge = bubbles.reduce((result, bubble) => {
            return Math.min(result, (now - bubble.t) / 1000);
        }, Infinity);

        ctx.fillStyle = "black";
        drawn.forEach(bubble => {
            ctx.fillRect(
                Math.floor(bubble.x - bubble.r),
                Math.floor(bubble.y - bubble.r),
                Math.ceil(2 * bubble.r + 1),
                Math.ceil(2 * bubble.r + 2)
            );
        });

        drawn = bubbles.map(bubble => {
            const dt = (now - bubble.t) / 1000;
            const z = bubble.z + 0.1 * (Math.sin(dt + bubble.offset) + 1) + dt / 10;
            const x = bubble.x + 700 * dt / Math.pow(bubble.z, 0.8);

            return {
                "x": x,
                "y": bubble.y,
                "r": maxR / z,
                "alpha": 1.0 / Math.pow(z, 0.6),
                "color": bubble.color
            };
        });

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        drawn.forEach(bubble => {
            ctx.fillStyle = bubble.color;
            ctx.globalAlpha = bubble.alpha;
            ctx.fillRect(bubble.x - bubble.r, bubble.y - bubble.r, 2 * bubble.r, 2 * bubble.r);
        });
        ctx.restore();

        bubbles = bubbles.filter((bubble, index) => {
            const d = drawn[index];
            return d.x - d.r < width ;
        });
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
        redraw();
    }

    function update() {
        redraw();
        requestAnimationFrame(update);
    }

    bubbles.push({
        "t": Date.now(),
        "x": 300,
        "y": 300,
        "r": 50
    });

    window.addEventListener("resize", resize);
    resize();
    update();
}

background(document.getElementById("background"));
main(document.getElementById("main"));
