const crypto = require('crypto');

function hash(input) { // Create md5 hash
    return crypto.createHash('md5').update(input).digest("hex")
}

let iteration = 0;
let md5;

function timeDiffer(date1, date2) { // Find the difference between two dates output in seconds
    let difference = date1 - date2;

    return Math.floor(difference/1000);
}

async function mine(i) {
    const timeStarted = Date.now();
    let timeElapsed = 0;
    console.log("╭───────────────EasyPlum 1.0───────────────╮"); // Template data that will be overwrote later
    console.log("│ Gpu Acceleration: Disabled               │"); // I cannot get gpu.js to install so I guess ill add that later
    console.log("│ Nonce: null                              │");
    console.log("│ MD5: null                                │");
    console.log("│ Iteration: null                          │");
    console.log("│ Time Elapsed: nulls                      │");
    while (true) {
        md5 = hash(i.toString()) // Create hash from nonce
        iteration++;
        timeElapsed = timeDiffer(Date.now(), timeStarted);
        process.stdout.write("\033[1A \r" + `│ Time Elapsed: ${timeElapsed}s`.padEnd(43, ' ') + "│\n")
        process.stdout.write("\033[2A \r" + `│ Iteration: ${iteration}`.padEnd(43, ' ') + "│\n\n")
        process.stdout.write("\033[3A \r│ MD5:   " + md5 + "  │\n\n\n"); // No need to pad the value as the length is fixed
        process.stdout.write("\033[4A \r" + `| Nonce: ${i}`.padEnd(43, ' ') + "│\n\n\n\n")
        if(md5.substring(0,4) === '0000' && md5.substring(md5.length - 2) === '00') { // If the first 4 digits of the hash are 0 and the last 2 digits are 0 then proof of work is complete
            console.log("\nCompleted!")
            return;
        }
        process.stdout.write("╰──────────────────────────────────────────╯") // I use stdout.write instead of console.log to remove the \n at the end
        i++; // Increase the nonce to check if the next number matches the requirements
    }
}

while (true) { // Mine a bunch of random nonces
    i = Math.round(Math.random() * 999999999);
    mine(i);
}