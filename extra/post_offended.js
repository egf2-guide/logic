"use strict";

const clientData = require("../components").clientData;
const searcher = require("../components").searcher;
const log = require("../components").logger;

// Rule #5
function onCreate(event) {
    return clientData.getGraphConfig().then(config =>
        clientData.forEachPage(
            last => searcher.search({object: "admin_role", count: config.pagination.max_count, after: last}),
            admins => Promise.all(admins.results.map(admin =>
                clientData.createEdge(admin, "offending_posts", event.edge.src)
                    .catch(err => {
                        log.error(err);
                    })
                ))
        )
    );
}

module.exports = {
    onCreate
};
