class LogLevel {
    static get EMERGENCY() {
        return 'emergency';
    }
    static get ALERT() {
        return 'alert';
    }
    static get CRITICAL() {
        return 'critical';
    }
    static get ERROR() {
        return 'error';
    }
    static get WARNING() {
        return 'warning';
    }
    static get NOTICE() {
        return 'notice';
    }
    static get INFO() {
        return 'info';
    }
    static get DEBUG() {
        return 'debug';
    }
}

module.exports = LogLevel;
