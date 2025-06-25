// Mengambil elemen dari DOM
const timerDisplay = document.getElementById("timer-display");
const presetButtons = document.querySelectorAll(".preset-btn");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const alarmSound = document.getElementById("alarm-sound");

let countdown; // Variabel untuk menyimpan interval
let timeInSeconds; // Variabel untuk menyimpan sisa waktu dalam detik

// Fungsi untuk menampilkan waktu dalam format MM:SS
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? "0" : ""}${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;

  timerDisplay.textContent = display;
  document.title = display; // Menampilkan waktu di judul tab browser
}

// Fungsi utama untuk memulai timer
function startTimer() {
  // Jika tidak ada waktu yang diset atau waktu sudah 0, jangan mulai
  if (!timeInSeconds || timeInSeconds <= 0) {
    return;
  }

  // Membersihkan interval sebelumnya jika ada
  clearInterval(countdown);

  startBtn.disabled = true; // Nonaktifkan tombol mulai saat timer berjalan

  countdown = setInterval(() => {
    timeInSeconds--; // Kurangi waktu setiap detik

    if (timeInSeconds < 0) {
      clearInterval(countdown);
      timerDisplay.classList.add("times-up");
      document.title = "Waktu Habis!";
      alarmSound.play(); // Mainkan suara alarm
      return;
    }

    displayTimeLeft(timeInSeconds);
  }, 1000);
}

// Fungsi untuk menghentikan timer
function stopTimer() {
  clearInterval(countdown);
  startBtn.disabled = false; // Aktifkan kembali tombol mulai
}

// Fungsi untuk mereset timer
function resetTimer() {
  clearInterval(countdown);
  timeInSeconds = 0;
  displayTimeLeft(0);
  document.title = "Egg Timer Sederhana";
  timerDisplay.classList.remove("times-up");
  alarmSound.pause();
  alarmSound.currentTime = 0;
  startBtn.disabled = true;
}

// Menambahkan event listener ke tombol preset
presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Mengambil waktu dari atribut data-time
    const seconds = parseInt(button.getAttribute("data-time"));

    clearInterval(countdown); // Hentikan timer yang mungkin sedang berjalan
    timeInSeconds = seconds;
    displayTimeLeft(timeInSeconds);
    timerDisplay.classList.remove("times-up");
    startBtn.disabled = false; // Aktifkan tombol mulai setelah waktu diset
  });
});

// Menambahkan event listener ke tombol kontrol
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Kondisi Awal
// Panggil resetTimer() di awal untuk memastikan tampilan bersih
resetTimer();
