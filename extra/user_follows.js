"use strict";

const clientData = require("../components").clientData;

// rule #1
function onCreate(event) {
    return clientData.createEdge(event.edge.dst, "followers", event.edge.src);
}

// rule #2
function onDelete(event) {
    return clientData.deleteEdge(event.edge.dst, "followers", event.edge.src);
}

module.exports = {
    onCreate,
    onDelete
};
