let isBlowing = false;
let isFlameOff = false;

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        setInterval(function() {
            analyser.getByteTimeDomainData(dataArray);
            const sum = dataArray.reduce((acc, val) => acc + val, 0);
            const average = sum / bufferLength;

            // Sesuaikan threshold agar tidak langsung mati saat halaman dimuat
            if (average > 130) { 
                if (!isBlowing && !isFlameOff) {
                    isBlowing = true;
                    toggleFlame(); // Mematikan api
                    toggleFlame2(); // Menampilkan teks "liat kadonya"
                    isFlameOff = true;
                }
            } else {
                isBlowing = false;
            }
        }, 300); // Interval dibuat lebih panjang agar lebih stabil
    })
    .catch(function(err) {
        console.error('Error accessing microphone:', err);
    });

function toggleFlame() {
    const flame = document.getElementById('toggleFlame');
    flame.classList.toggle('off');
}

function toggleFlame2() {
    const flame2 = document.getElementById('texttoggleFlame');
    flame2.classList.toggle('on');
}

// Memastikan api tetap menyala saat pertama kali muncul
document.addEventListener("DOMContentLoaded", function() {
    const flame = document.getElementById('toggleFlame');
    flame.classList.remove('off');
});

document.getElementById('toggleFlame').addEventListener('click', function() {
    this.classList.toggle('off');
    document.getElementById('texttoggleFlame').classList.toggle('on');
    isFlameOff = !isFlameOff;
});

    function closeWindow() {
        // Menutup jendela atau tab saat tombol diklik
        window.close();
    }

    document.addEventListener("DOMContentLoaded", function() {
        const audio = document.getElementById('birthdaySong');
    
        // Pertama, minta izin kepada pengguna untuk memutar audio
        Swal.fire({
            title: 'Izinkan Audio',
            text: 'klik "izinkan" untuk memutar lagu ulang tahun.',
            icon: 'question',
            confirmButtonText: 'izinkan',
            allowOutsideClick: false, // Tidak memungkinkan untuk menutup pop-up dengan mengklik luar
            customClass: {
                container: 'swal-container-netflix',
                popup: 'swal-popup-netflix',
                title: 'swal-title-netflix',
                text: 'swal-text-netflix',
                confirmButton: 'swal-confirm-button-netflix'
            }
        }).then(() => {
            // Coba memutar audio setelah izin diberikan
            audio.play().catch(error => {
                // Jika autoplay diblokir, tampilkan pop-up untuk meminta interaksi manual
                Swal.fire({
                    title: 'Audio Terblokir',
                    text: 'Klik di bawah untuk memutar lagu ulang tahun!',
                    icon: 'info',
                    confirmButtonText: 'Mainkan',
                    customClass: {
                        container: 'swal-container-netflix',
                        popup: 'swal-popup-netflix',
                        title: 'swal-title-netflix',
                        text: 'swal-text-netflix',
                        confirmButton: 'swal-confirm-button-netflix'
                    }
                }).then(() => {
                    // Putar audio setelah pengguna mengklik tombol
                    audio.play();
                });
            });
    
            // Tampilkan instruksi meniup lilin setelah meminta izin
            showCandleBlowingInstructions();
        });
    
        // Fungsi untuk menampilkan instruksi meniup lilin
        function showCandleBlowingInstructions() {
            Swal.fire({
                title: 'cara tiup lilin',
                text: 'tiup lilinnya lewat mic, tiup di mic sekenceng mungkin sampe lilinnya mati (alternatif lain lilinnya dipencet)',
                confirmButtonText: 'ayo lihat kuenya',
                customClass: {
                    container: 'swal-container-netflix',
                    popup: 'swal-popup-netflix',
                    title: 'swal-title-netflix',
                    text: 'swal-text-netflix',
                    confirmButton: 'swal-confirm-button-netflix'
                }
            });
        }
    });