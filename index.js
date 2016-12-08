var eventConsumer = require("commons/event-consumer");
var components = require("./components");
var logic;
var logger;
var util;

function processEvent(event) {
    var eventStr = util.getEventString(event);
    return util.extractPath(event).then(path => {
        var rule = logic[path];
        if (rule) {
            return Promise.resolve().then(() => rule(event))
                .then(() => logger.info("RECEIVED EVENT:", path))
                .catch(err => logger.error(`EVENT ${eventStr} PATH ${path} ERROR: ${err}`));
        }
    })
    .catch(err => logger.error(err));
}

components.init().then(() => {
    var config = components.config;
    logger = components.logger;
    logic = require("./extra");
    util = require("./util");

    eventConsumer(config, processEvent, error => {
        logger.error(error);
    });
});
