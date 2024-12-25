function updateScore(team, increment) {
    const scoreElement = document.getElementById(`${team}-score`);
    let currentScore = parseInt(scoreElement.textContent, 10);
    currentScore = Math.max(0, currentScore + increment);
    scoreElement.textContent = currentScore;

    updateRankings();
}

function updateRankings() {
    const rows = Array.from(document.querySelectorAll("#scoreboard tbody tr"));
    const scores = rows.map(row => ({
        team: row.querySelector("td:nth-child(2)").textContent,
        score: parseInt(row.querySelector(".score").textContent, 10),
        row: row
    }));

    scores.sort((a, b) => b.score - a.score);

    scores.forEach((entry, index) => {
        entry.row.querySelector(".place").textContent = index + 1;
        entry.row.parentNode.appendChild(entry.row);
    });

    document.getElementById("gold").textContent = scores[0]?.team || "-";
    document.getElementById("silver").textContent = scores[1]?.team || "-";
    document.getElementById("bronze").textContent = scores[2]?.team || "-";

    showPodium(scores);
}

function showPodium(scores) {
    const podium = document.getElementById("podium");
    podium.style.display = "block";

    setTimeout(() => {
        const bronze = document.getElementById("bronze");
        bronze.style.opacity = 1;
        bronze.querySelector("span").textContent = scores[2]?.team || "-";

        setTimeout(() => {
            const silver = document.getElementById("silver");
            silver.style.opacity = 1;
            silver.querySelector("span").textContent = scores[1]?.team || "-";

            setTimeout(() => {
                const gold = document.getElementById("gold");
                gold.style.opacity = 1;
                gold.querySelector("span").textContent = scores[0]?.team || "-";
            }, 10000);
        }, 10000);
    }, 1000);
}

window.onload = () => {
    updateRankings();
};
