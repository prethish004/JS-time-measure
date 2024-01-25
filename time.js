let startTime;
let timerInterval;
let isTimerRunning = false;

function startStopTimer() {
    if (!isTimerRunning) {
      startTimer();
    } else {
      stopTimer();
    }
 }

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);

    isTimerRunning = true;

    document.getElementById('startStopBtn').innerHTML = 'Stop Timer';
    document.getElementById('deleteBtn').disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);

    const endTime = new Date().getTime();
    const duration = formatTime(Math.floor((endTime - startTime) / 1000));

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    const table = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = taskName || 'N/A';
    cell2.innerHTML = taskDescription || 'N/A';
    cell3.innerHTML = duration;

    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';

    isTimerRunning = false;

    document.getElementById('startStopBtn').innerHTML = 'Start Timer';
    document.getElementById('deleteBtn').disabled = false;

    document.getElementById('timerDisplay').innerHTML = '00:00:00';
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.innerHTML = `Timer: ${formatTime(elapsedSeconds)}`;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
}

function padWithZero(value) {
    return value < 10 ? `0${value}` : `${value}`;
}

function deleteRow() {
    const table = document.getElementById('taskTable');
    const rowCount = table.rows.length;

    if (rowCount > 1) {
      table.deleteRow(rowCount - 1);
    }
}