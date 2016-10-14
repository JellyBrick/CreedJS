/* global creedjs */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Level = require('./log-level');

class Logger {
    constructor(logPath, debug) {
        /**
         * @description
         * 로그가 저장되는 기본 경로가 이 변수에 저장됩니다.
         */
        this.logDefaultPath = logPath;

        /**
         * @description
         * 디버그 메세지 로깅 여부가 이 변수에 저장됩니다.
         */
        this.logDebug = debug;

        /**
         * @description
         * The color used the time and level name on left
         * 로그 좌측에 기록되는 시간 및 레벨명에 쓰일 기본 색상이 이 변수에 저장됩니다.
         */
        this.leftColor = chalk.styles.yellow;
        this.messageFormat = '%lcolor[%time] %lvcolor[%level] %rcolor%msg';
        this.createLogStream(logPath);
    }

    emergency(msg) {
        this.__send(Level.EMERGENCY, msg);
    }

    alert(msg) {
        this.__send(Level.ALERT, msg);
    }

    error(msg) {
        this.__send(Level.ERROR, msg);
    }

    warning(msg) {
        this.__send(Level.WARNING, msg);
    }

    critical(msg) {
        this.__send(Level.CRITICAL, msg);
    }

    info(msg) {
        this.__send(Level.INFO, msg);
    }

    notice(msg) {
        this.__send(Level.NOTICE, msg);
    }

    debug(msg) {
        if (!this.debug) {
            return;
        }
        this.__send(Level.DEBUG, msg);
    }

    createLogStream(lpath) {
        let now = new Date();

        /**
         * @description
         * The date in the form of [20XX-MM-DD] is stored as a string.
         * 문자열 [20XX-MM-DD] 형식으로 변수에 저장됩니다.
         */
        let timeFormat = String();
        timeFormat += now.getFullYear();
        timeFormat += '-' + (String(now.getMonth()).length > 1 ? now.getMonth() : '0' + now.getMonth());
        timeFormat += '-' + (String(now.getDate()).length > 1 ? now.getDate() : '0' + now.getDate());

        let logFile = require('iconv-lite').encode(String(timeFormat + '.log'), 'utf8');
        if(!lpath) lpath = this.logDefaultPath;
        
        let logPath = path.join(lpath + 'log/');
        try {
            fs.mkdirSync(logPath);
        } catch (e) {/* empty */}

        /**
         * @description
         * Create a folder under the log folder year name as log/20XX.
         * log/20XX 와 같이 log 폴더 아래에 년도명으로 폴더를 생성합니다.
         */
        logPath += now.getFullYear() + '/';
        try {
            fs.mkdirSync(logPath);
        }
        catch (e) {/* empty */}

        /**
         * @description
         * Create a folder. 20XX folder as under the month names folder as like 'log/20XX/12'
         * log/20XX/12 와 같이 년도 폴더 아래에 월명으로 폴더를 생성합니다.
         */
        logPath += (String(now.getMonth()).length > 1 ? now.getMonth() : '0' + now.getMonth()) + '/';
        try {
            fs.mkdirSync(logPath);
        }
        catch (e) {/* empty */}

        /**
         * @description
         * Create a file stream and save in this variables.
         * 파일스트림을 생성해서 이 변수에 저장합니다.
         */
        this.logStream = fs.createWriteStream(logPath + logFile, {
            flags: 'a'
        });
    }

    /**
     * @description
     * Internal function writing/processsing logs.
     * 로그를 기록/처리하는 내부 함수입니다.
     */
    __send(level, msg) {
        let message;

        switch (level) {
            case Level.EMERGENCY:
                message = this._parseMessage('emergency', chalk.styles.red, chalk.styles.reset, msg);
                break;
            case Level.ALERT:
                message = this._parseMessage('alert', chalk.styles.red, chalk.styles.reset, msg);
                break;
            case Level.CRITICAL:
                message = this._parseMessage('critical', chalk.styles.red, chalk.styles.reset, msg);
                break;
            case Level.ERROR:
                message = this._parseMessage('error', chalk.styles.red, chalk.styles.reset, msg);
                break;
            case Level.WARNING:
                message = this._parseMessage('warning', chalk.styles.yellow, chalk.styles.reset, msg);
                break;
            case Level.NOTICE:
                message = this._parseMessage('notice', chalk.styles.blue, chalk.styles.reset, msg);
                break;
            case Level.INFO:
                message = this._parseMessage('info', chalk.styles.green, chalk.styles.reset, msg);
                break;
            case Level.DEBUG:
                message = this._parseMessage('debug', chalk.styles.gray, chalk.styles.reset, msg);
                break;
        }

        if(!message){
            message = this._parseMessage(null, message);
        }

        /**
         * @description
         * If the date is changed during server operation,
         * save the old log file and open new log file.
         * 서버 동작중 날짜가 변경된 경우
         * 이전 로그파일을 저장하고, 새 로그파일을 엽니다.
         */
        if (this.logDate != (new Date()).getDate()) {
            this.logStream.end();
            this.createLogStream();
        }

        console.log(message);
        this.logStream.write(this.clean(message) + '\r\n');
    }

    /**
     * @description
     * Returns formatted message as message format.
     * 메세지 포맷대로 변환하여 반환합니다.
     * @return {string}
     */
    _parseMessage(level, lvcolor, msgcolor, msg) {
        /**
         * @description
         * Time is converted to a string form of
         * [TT:: MM SS] and stored in this variable.
         * [24:59:59] 의 형태로 시간이 문자열로 이 변수에 저장됩니다.
         */
        let now = new Date();
        let timeFormat = String();
        timeFormat += (String(now.getHours()).length > 1 ? now.getHours() : '0' + now.getHours());
        timeFormat += ':' + (String(now.getMinutes()).length > 1 ? now.getMinutes() : '0' + now.getMinutes());
        timeFormat += ':' + (String(now.getSeconds()).length > 1 ? now.getSeconds() : '0' + now.getSeconds());
        let message;
        if(level !== null) {
            message = this.messageFormat
                .replace('%lcolor', this.leftColor.open)
                .replace('%time', timeFormat )
                .replace('%lvcolor', lvcolor.open)
                .replace('%level', level)
                .replace('%rcolor', msgcolor.open)
                .replace('%msg', msg);
            return message;
        } else {
            message = this.messageFormat.replace('%lcolor', '')
                .replace('%time', timeFormat )
                .replace('%reset', '')
                .replace('%level', '')
                .replace('%rcolor', '')
                .replace('%msg', msg);
        }
        return message;
    }

    replaceAll(str, search, replace) {
        if (replace === undefined) {
            return str.toString();
        }
        return str.replace(new RegExp(search, 'g'), replace);
    }

    /**
     * @return {String}
     */
    clean(message) {
        return this.replaceAll(message, String.fromCharCode(0x1b) + '[0-9;\\[\\(]+[Bm]', '');
    }
}

var logger = new Logger(__dirname + '/', true);
logger.info('hi');
logger.error('what??');

module.exports = Logger;
