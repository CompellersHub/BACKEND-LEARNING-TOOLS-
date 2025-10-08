"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemUptime = void 0;
exports.getUptimePercentage = getUptimePercentage;
exports.getSystemUptimePercentage = getSystemUptimePercentage;
const child_process_1 = require("child_process");
const startTime = Date.now();
exports.systemUptime = {
    inNode: 0,
    linus: 0,
};
function getUptimePercentage() {
    const uptimeMs = Date.now() - startTime;
    const totalPossibleTimeMs = 30 * 24 * 60 * 60 * 1000;
    const uptimePercentage = ((uptimeMs / totalPossibleTimeMs) * 100).toFixed(2);
    exports.systemUptime.inNode = Number(uptimePercentage);
    return `${uptimePercentage}%`;
}
function getSystemUptimePercentage() {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)("awk '{print $1}' /proc/uptime | cut -d. -f1", (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`Stderr: ${stderr}`);
                return;
            }
            const uptimeSeconds = parseInt(stdout.trim(), 10);
            const totalPossibleTime = 30 * 24 * 60 * 60;
            const uptimePercentage = ((uptimeSeconds / totalPossibleTime) *
                100).toFixed(2);
            exports.systemUptime.linus = Number(uptimePercentage);
            resolve(`${uptimePercentage}%`);
        });
    });
}
//# sourceMappingURL=uptime.js.map