"use strict";

// add "<method, e.g. POST, GET, PUT, DELETE> <object type or edge>": <function handler(event)>
const handleRegistry = {
    "POST user/follows": require("./user_follows").onCreate,
    "DELETE user/follows": require("./user_follows").onDelete,
    "POST user/posts": require("./user_posts").onCreate,
    "DELETE user/posts": require("./user_posts").onDelete,
    "POST post/offended": require("./post_offended").onCreate,
    "DELETE post/offended": require("./post_offended").onDelete
};
module.exports = handleRegistry;
