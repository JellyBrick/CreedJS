class Protocal {
    /**
     * @description
     * Child process sends this to master process preventing log overlapping.
     * 로그 중복을 방지하기 위해 마스터 프로세스에 로그와 함께 전달하는 코드입니다.
     */
    static get LOG() {
        return 0x01;
    }

    /**
     * @description
     * Child process sends this to master process when player join happened.
     * 
     */
    static get PLAYER_JOIN() {
        return 0x02;
    }
    static get PLAYER_QUIT() {
        return 0x03;
    }
    static get CLIENT_START() {
        return 0x04;
    }
    static get CLIENT_OPEN() {
        return 0x05;
    }
    static get CLIENT_CLOSE() {
        return 0x06;
    }
    static get SHUTDOWN() {
        return 0x07;
    }
    static get SHUTDOWN_CHECK() {
        return 0x08;
    }
}

module.epxorts = Protocal;