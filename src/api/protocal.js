class Protocal {
    get SERVER_OPEN() {
        return 0x01;
    }

    get SERVER_CLOSE() {
        return 0x02;
    }

    get SERVER_RESTART() {
        return 0x03;
    }

    get PLAYER_JOIN() {
        return 0x04;
    }

    get PLAYER_QUIT() {
        return 0x05;
    }

    get HEARTBEAT() {
        return 0x06;
    }
}

module.exports = Protocal;