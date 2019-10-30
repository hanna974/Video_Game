export default class Timer {
    constructor() {
        this.currentTime = 0;
    }

    startClick(clbk) {
        this.intervalId = setInterval(() => {
            this.currentTime += 1;
            clbk();
        }, 1000);
    }

    getMinutes() {
        if (this.currentTime >= 60) {
            return Math.floor(this.currentTime / 60);
        }
        return 0;
    }

    getSeconds() {
        return this.currentTime % 60;
    }

    twoDigitsNumber(value) {
        if (value < 10) {
            return `0` + `${value}`;
        }
        return `${value}`;
    }

    resetClick() {
        this.currentTime = 0;
    }

    stopClick() {
        clearInterval(this.intervalId);
    }
}