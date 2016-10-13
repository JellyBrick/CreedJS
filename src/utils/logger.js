const fs = require('fs');
const chalk = require('chalk');

class Logger {
    constructor(path, debug) {
        /**
         * @description
         * 디버그 메세지 로깅 여부가 이 변수에 저장됩니다.
         */
        this.logDebug = debug;

        /**
         * @description
         * 로그 좌측에 기록되는 시간 및 레벨명에 쓰일 기본 색상이 이 변수에 저장됩니다.
         */
        this.leftColor = chalk.yellow;
        this.messageFormat = '[%time] [level] msg';
    }

    alert(msg) {

    }

    error(msg) {

    }

    critical(msg) {

    }

    info(msg) {

    }

    notice(msg) {

    }

    debug(msg) {

    }

    createLogStream() {
        let now = new Date();

        /**
         * @description
         *
         */
        let timeFormat = String();
        timeFormat += now.getFullYear();
        timeFormat += '-' + (String(now.getMonth()).length > 1 ? now.getMonth() : '0' + now.getMonth());
        timeFormat += '-' + (String(now.getDate()).length > 1 ? now.getDate() : '0' + now.getDate());

        let logPath = path + '/log/';
        try {
            fs.mkdirSync(logPath);
        } catch (e) {}
    }
}

module.exports = Logger;
