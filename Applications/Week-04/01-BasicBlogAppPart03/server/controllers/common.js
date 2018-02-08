class Common {
    static resultOk(res, obj) {
        res.json({ data: obj });
    }
    static resultErr(res, obj) {
        res.status(500).json({ error: obj });
    }
    static resultNotFound(res, msg) {
        res.status(404).json({ message: msg ? msg : 'Not Found' });
    }
}

module.exports = Common;