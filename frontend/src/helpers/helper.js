export const congratulations = () => {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    const rnd = Math.random() * 2
    confetti.style.left = rnd >= 1 ? Math.random() * -100 + "vw" : Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 3 + 1 + "s";

    confetti.innerText = Math.random() * 2 >= 1 ? '🎊' : '🎉';

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 4000);
}
export const sendScore = async (userId, score, difficulty, duration) => {
    const mins=Math.trunc(duration/60)
	const seconds=duration-(mins*60)
    return await fetch(`http://localhost:8080/games/add/${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score, difficulty, duration:`${mins}m ${seconds}s` })
    })
}
export const getGameResume = async (gameId) => {
    if (gameId) {
        return await fetch(`http://localhost:8080/games/resume/${gameId}`, {
            method: 'GET'
        })
    } else {
        return null
    }
}


