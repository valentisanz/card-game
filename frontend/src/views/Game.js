import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './styles/Game.css';
import Card from '../components/Card'
import { sendScore } from '../helpers/helper'
import Duration from 'duration'

function Game() {
	const history = useHistory()
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
	const fronts = ['🐝', '🦁', '🐮', '🐻', '🐝', '🦁', '🐮', '🐻',]
		.sort(() => Math.random() - 0.5)
		.map(f => {
			return {
				content: f,
				shown: true,
			}
		})
	const [cards, setCards] = useState(fronts)
	const [firstCard, setFirstCard] = useState(null)
	const [flipping, setFlipping] = useState(false)
	const [score, setScore] = useState(10)
	const [playing, setPlaying] = useState(false)
	const [hits, setHits] = useState(0)
	const [difficulty, setDifficulty] = useState(0)
	const [startTime, setStartTime] = useState(null)

	//function to flip visually the card, changing it state
	const toggleFlip = (i) => {
		setCards(cards.map((item, index) => {
			if (i === index) {
				return {
					content: item.content,
					shown: !item.shown,
				}
			} else {
				return item
			}
		}))
	}
	//function to start the game with the selected difficulty
	const start = (difficulty) => {
		if (!localStorage.getItem('user')) {
			history.push('/')
		} else {
			setDifficulty(difficulty)
			setPlaying(true)
			setFlipping(true)
			setTimeout(() => {
				setCards(cards.map((item) => {
					return {
						content: item.content,
						shown: !item.shown,
					}
				}))
				setFlipping(false)
				setStartTime(new Date())
			}, 3000 / difficulty);
		}

	}

	//function with the logic when a card is flipped
	const flip = (i) => {
		if (localStorage.getItem('user')) {
			if (!flipping && playing && !cards[i].shown) {
				if (firstCard === null) {
					//we save the first card fliped to compare it with the next one
					setFirstCard(i)
				} else {
					//second card flipped
					const firstCardContent = cards[firstCard].content
					const secondCardContent = cards[i].content
					//check card content
					if (firstCardContent === secondCardContent) {
						setHits(hits + 1)
						if (hits === 3) {
							const duration = new Duration(startTime, new Date()).seconds
							sendScore(user.id, score, difficulty, duration)
								.then(data => {
									return data.json()
								})
								.then(game => {
									localStorage.setItem('game', JSON.stringify(game))
									history.push('resume')
								})
						}
						setFirstCard(null)
					} else {
						setFlipping(true)
						setTimeout(() => {
							toggleFlip(i)
							toggleFlip(firstCard)
							setFirstCard(null)
							setFlipping(false)
							setScore(score === 0 ? score : score - 1)
						}, 1500 / difficulty);
					}

				}
				toggleFlip(i)
			}
		}
	}
	//delete user locally
	const logout = () => {
		localStorage.removeItem('user')
		history.push('/')
	}

    //if no user is saved locally go to login page
	if (!localStorage.getItem('user')) {
		return <Redirect to='/' />
	}
	return (
		<div className="Game">
			{!playing ? <h1 className='difficultyTitle'>Choose difficulty:</h1> : ''}
			{playing ? '' : <button className='play easy' onClick={() => start(1)}>EASY</button>}
			{playing ? '' : <button className='play normal' onClick={() => start(3)}>NORMAL</button>}
			{playing ? '' : <button className='play difficult' onClick={() => start(10)}>DIFFICULT</button>}
			{playing ? '' : <button className='logout' onClick={() => logout()}>Logout</button>}
			{ playing
				? <div className='board'>

					<div className='cards'>
						{cards && cards.map((card, index) => {
							return (
								<Card
									key={index}
									flip={() => flip(index)}
									content={card.content}
									shown={card.shown}
								/>
							)
						}
						)}
					</div>


				</div>
				: ''}

		</div>
	);
}

export default Game;
