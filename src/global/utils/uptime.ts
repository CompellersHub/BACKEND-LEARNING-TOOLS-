import { exec } from "child_process";
const startTime = Date.now();

export const systemUptime: { inNode: number; linus: number } = {
  inNode: 0,
  linus: 0,
};
export function getUptimePercentage() {
  const uptimeMs = Date.now() - startTime;
  const totalPossibleTimeMs = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
  const uptimePercentage = ((uptimeMs / totalPossibleTimeMs) * 100).toFixed(2);
  systemUptime.inNode = Number(uptimePercentage);
  return `${uptimePercentage}%`;
}

// Linux uptime calculation. This is useful on linux environment
export function getSystemUptimePercentage() {
  return new Promise((resolve, reject) => {
    // Execute the Linux uptime command
    exec(
      "awk '{print $1}' /proc/uptime | cut -d. -f1",
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Stderr: ${stderr}`);
          return;
        }

        const uptimeSeconds = parseInt(stdout.trim(), 10);
        const totalPossibleTime = 30 * 24 * 60 * 60; // 30 days in seconds
        const uptimePercentage = (
          (uptimeSeconds / totalPossibleTime) *
          100
        ).toFixed(2);
        systemUptime.linus = Number(uptimePercentage);
        resolve(`${uptimePercentage}%`);
      }
    );
  });
}

// Usage
// getSystemUptimePercentage()
//   .then((percentage) => console.log(`System Uptime: ${percentage}`))
//   .catch((err) => console.error(err));

// // uptimeMonitor.js Update Periodically
// const { exec } = require('child_process');
// const globalState = require('./globalState');

// function updateUptime() {
//   exec('awk \'{print $1}\' /proc/uptime | cut -d. -f1', (error, stdout) => {
//     if (!error) {
//       const uptimeSeconds = parseInt(stdout.trim(), 10);
//       globalState.systemUptime = ((uptimeSeconds / (30 * 24 * 60 * 60)) * 100).toFixed(2);
//     }
//   });
// }

// // Update every minute
// setInterval(updateUptime, 60 * 1000);
// updateUptime(); // Initial call

//  Logging Uptime to a File
// const fs = require("fs");
// const { getSystemUptimePercentage } = require("./systemUptime");

// async function logUptime() {
//   const uptime = await getSystemUptimePercentage();
//   fs.appendFileSync(
//     "uptime.log",
//     `[${new Date().toISOString()}] Uptime: ${uptime}%\n`
//   );
// }

// // Log every hour
// setInterval(logUptime, 60 * 60 * 1000);
// logUptime();
