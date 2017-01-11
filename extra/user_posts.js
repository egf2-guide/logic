"use strict";

const clientData = require("../components").clientData;
const searcher = require("../components").searcher;
const log = require("../components").logger;

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
    return clientData.deleteObject(event.edge.dst).then(() =>
        clientData.getGraphConfig().then(config =>
            clientData.forEachPage(
                last => searcher.search({object: "admin_role", count: config.pagination.max_count, after: last}),
                admins => Promise.all(admins.results.map(admin =>
                    clientData.deleteEdge(admin, "offending_posts", event.edge.dst).catch(err => {
                        log.error(err);
                    })
                ))
            )
        )
    );
}

module.exports = {
    onCreate,
    onDelete
};
