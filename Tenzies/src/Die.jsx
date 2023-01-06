import React from 'react'

const Die = (prop) => {
	const styles = {
		backgroundColor: prop.isHeld ? '#59E391' : '#ffffff',
	}
	return (
		<div
			className="die flex-container"
			style={styles}
			onClick={prop.holdDice}>
			{prop.value}
		</div>
	)
}

export default Die
