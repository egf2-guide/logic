"use strict";

const clientData = require("./components").clientData;

function extractPath(event) {
    let path;
    if (event.object) {
        path = clientData.getObjectType(event.object);
    } else {
        path = clientData.getObjectType(event.edge.src).then(str => `${str}/${event.edge.name}`);
    }
    return path.then(str => `${event.method} ${str}`);
}

function getEventString(event) {
    let path;
    if (event.object) {
        path = event.object;
    } else {
        path = `${event.edge.src}/${event.edge.name}/${event.edge.dst}`;
    }
    return `${event.method} ${path}`;
}

module.exports = {
    extractPath,
    getEventString
};
