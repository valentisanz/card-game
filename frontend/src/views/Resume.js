import React, { useState, useEffect } from 'react';
import { congratulations } from '../helpers/helper'
import { useHistory } from 'react-router-dom';

function Resume() {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [lastGame, setLastGame] = useState({})
    
    //winning game animation
    if (localStorage.getItem('game')) {
        setInterval(() => {
            congratulations()
        }, 100);
    }
    useEffect(() => {
        //get the top 5 games
        async function fetchRanking() {
            const response = await fetch(`http://localhost:8080/games/ranking`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setGames(data)
            setLastGame(JSON.parse(localStorage.getItem('game')))
            localStorage.removeItem('game')
        }
        fetchRanking()
    }, [])

    //function to return the difficulty formatted
    const getDifficultyName = (difficulty) => {
        let diff
        switch (difficulty) {
            case 1:
                diff = 'EASY'
                break;
            case 3:
                diff = 'MEDIUM'
                break;
            case 10:
                diff = 'HARD'
                break;

            default:
                break;
        }
        return diff
    }
    //play againt button, go to game page
    const playAgain = () => {
        history.push('/game')
        window.location.reload()
    }
    return (
        <div className='Resume'>
            <h1>Ranking</h1>
            <h2># - username - points - mode</h2>
            <div className='results'>
                {games && games.map((game, index) => {

                    return (
                        <p key={game.id}>#{index + 1} {game.user.username} - {game.score} pts - {getDifficultyName(game.difficulty)}</p>
                    )
                })}
                {lastGame != null ? <h2 className='rankingTitle'>Last game resume</h2> : ''}
                {lastGame != null ? <p>Duration: {lastGame.duration}</p> : ''}
                {lastGame != null ? <p>Score: {lastGame.score}</p> : ''}
                {lastGame != null ? <p>Difficulty: {getDifficultyName(lastGame.difficulty)}</p> : ''}
            </div>
            <button className='playAgain' onClick={() => playAgain()}>Play</button>
        </div>
    );
}

export default Resume;
