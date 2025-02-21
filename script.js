let selectedGame = "";

// Pilih game
function selectGame(game) {
    selectedGame = game;
    alert("Game yang dipilih: " + game);
}

// Kirim data top-up
function submitTopup() {
    const gameId = document.getElementById("game_id").value;
    const nominal = document.getElementById("nominal").value;

    if (!selectedGame) {
        alert("Silakan pilih game terlebih dahulu!");
        return;
    }
    if (!gameId || !nominal) {
        alert("Harap isi semua field!");
        return;
    }

    // Simulasi pengiriman ke server
    fetch("/api/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: selectedGame, game_id: gameId, nominal: nominal })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("response").innerText = "Status: " + data.status;
    })
    .catch(err => console.error("Error:", err));
}
