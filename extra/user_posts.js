"use strict";

const clientData = require("../components").clientData;

// Rule #3
function onCreate(event) {
    return clientData.forEachPage(
        last => clientData.getEdges(event.edge.src, "followers", {after: last}),
        followers => Promise.all(followers.results.map(follower =>
            clientData.createEdge(follower.id, "timeline", event.edge.dst)
        ))
    );
}

// Rule #4
function onDelete(event) {
    return clientData.forEachPage(
        last => clientData.getEdges(event.edge.src, "followers", {after: last}),
        followers => Promise.all(followers.results.map(follower =>
            clientData.createEdge(follower.id, "timeline", event.edge.dst)
        ))
    );
}

module.exports = {
    onCreate,
    onDelete
};
