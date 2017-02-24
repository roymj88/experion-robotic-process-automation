

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, x-fake-token');
        res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.header("Pragma", "no-cache"); // HTTP 1.0.
        res.header("Expires", "0"); // Proxies.
        next();
    });
}