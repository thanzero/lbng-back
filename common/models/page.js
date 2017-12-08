'use strict';

module.exports = function(Page) {
    Page.remoteMethod('findByUrl', {
        accepts: {arg: 'url', type: 'string', required: true},
        returns: {arg: 'page', type: 'Page'},
        http: {"verb": "get", "path": "/url"},
    })

    Page.findByUrl = function(url , cb) {
        console.log("this url passed to this method:", url);
        Page.findOne({where: {"url": url}}, function(err, page) {
            if (err) {
                return cb(err);
            }
            if (page) {
                return cb(page)
            } else {
                let error = new Error("Page not found!");
                error.status = 404;
                return cb(error);
            }
        })
    }
};
