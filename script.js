const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

// Stopwatch Variables
let stopwatchTime = 0; // in seconds
let isRunning = false;
let stopwatchInterval;
let lastUpdateTime = Date.now();

// Draw Clock and Stopwatch on the Canvas
function drawClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Clear canvas for redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Draw the clock face (circle)
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    // Draw the clock numbers (1-12)
    drawClockNumbers();

    // Draw the clock hands
    drawClockHands(hours, minutes, seconds);

    // Draw Stopwatch at the bottom
    drawStopwatch();

    ctx.restore();
}

// Draw the clock numbers (1 to 12)
function drawClockNumbers() {
    ctx.save();
    ctx.font = '18px Arial';
    ctx.fillStyle = '#000';
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * Math.PI / 6;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 100;
        ctx.fillText(i, x - 10, y + 10); // Adjust the number position a little bit
    }
    ctx.restore();
}

// Draw the clock hands (hour, minute, second)
function drawClockHands(hours, minutes, seconds) {
    // Draw Hour Hand
    ctx.save();
    ctx.rotate((Math.PI / 6) * (hours % 12) + Math.PI / 360 * minutes);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -60);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.restore();

    // Draw Minute Hand
    ctx.save();
    ctx.rotate(Math.PI / 30 * minutes);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.restore();

    // Draw Second Hand
    ctx.save();
    ctx.rotate(Math.PI / 30 * seconds);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -120);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
    ctx.restore();
}

// Draw the stopwatch time at the bottom of the canvas
function drawStopwatch() {
    const stopwatchSeconds = stopwatchTime % 60;
    const stopwatchMinutes = Math.floor(stopwatchTime / 60);
    const stopwatchHours = Math.floor(stopwatchTime / 3600);

    // Display stopwatch time at the bottom
    ctx.save();
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(
        `Stopwatch: ${String(stopwatchHours).padStart(2, '0')}:${String(stopwatchMinutes).padStart(2, '0')}:${String(stopwatchSeconds).padStart(2, '0')}`,
        -150, 170 // Positioning at the bottom part of canvas
    );
    ctx.restore();
}

// Display the current time at the top of the canvas
function drawCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(
        `Current Time: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        -120, -150 // Positioning at the top part of canvas
    );
    ctx.restore();
}

// Start/Stop the Stopwatch
function toggleStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        document.getElementById("startStopBtn").textContent = "Start";
    } else {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        document.getElementById("startStopBtn").textContent = "Stop";
    }
    isRunning = !isRunning;
}

// Update the stopwatch time
function updateStopwatch() {
    const now = Date.now();
    stopwatchTime += Math.floor((now - lastUpdateTime) / 1000);
    lastUpdateTime = now;
    drawClock();
}

// Reset the Stopwatch
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById("startStopBtn").textContent = "Start";
    isRunning = false;
    drawClock();
}

// Event Listeners
document.getElementById("startStopBtn").addEventListener("click", toggleStopwatch);
document.getElementById("resetBtn").addEventListener("click", resetStopwatch);

// Update the clock and stopwatch every second
setInterval(() => {
    drawClock();
    drawCurrentTime(); // Draw the current time on every update
}, 1000);
