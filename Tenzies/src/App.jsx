import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use-window-size'
import './App.css'
import Die from './Die'

function App() {
	const [dice, setDice] = useState(allNewDice())
	const [tenzies, setTenzies] = useState(false)

	useEffect(() => {
		const diceHeld = dice.every((die) => die.isHeld)
		const diceEqual = dice.every(
			(die, i, arr) => die.value === arr[0].value
		)
		if (diceHeld && diceEqual) {
			setTenzies(true)
			console.log('You Won!!')
		}
	}, [dice])

	function allNewDice() {
		let dice = []
		for (let i = 0; i < 10; i++) {
			const rand = Math.floor(Math.random() * (6 - 1 + 1) + 1)
			dice.push({
				value: rand,
				isHeld: false,
			})
		}
		return dice
	}

	function diceReroll() {
		setDice((oldArr) => {
			return oldArr.map((die, i) => {
				if (!die.isHeld) {
					return {
						...die,
						value: Math.floor(Math.random() * (6 - 1 + 1) + 1),
					}
				} else {
					return die
				}
			})
		})
	}

	function holdDice(id) {
		setDice((oldArr) => {
			return oldArr.map((die, i) => {
				if (i === id) {
					return {
						...die,
						isHeld: !die.isHeld,
					}
				} else {
					return die
				}
			})
		})
	}

	function resetGame() {
		setDice(allNewDice())
		setTenzies(false)
	}

	const diceElement = dice.map((die, i) => {
		return (
			<Die
				key={i}
				value={die.value}
				isHeld={die.isHeld}
				holdDice={() => holdDice(i)}
			/>
		)
	})

	const { width, height } = useWindowSize()

	return (
		<main className="flex-container">
			{tenzies && <Confetti width={width} height={height} />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at
				its current value between rolls.
			</p>
			<div className="grid-container dice">{diceElement}</div>
			<button onClick={tenzies ? resetGame : diceReroll}>
				{tenzies ? 'New Game' : 'Roll'}
			</button>
		</main>
	)
}

export default App
