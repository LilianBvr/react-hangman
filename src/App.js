import React, {Component} from 'react';

import './App.css';

import Mask from './Mask'
import Keyboard from './Keyboard'

export const LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

class App extends Component {

	constructor(){
		super()

		/*	Etat local	*/
		this.state = this.getInitState()
	}
	
	/*	Méthode de rendu du composant	*/
	render(){
		const { mask, testedLetters, won } = this.state
	  	return (
	    	<div className="hangman">
	    		<Mask mask={mask} />

	    		{
	    			won ? <button className="restart" onClick={this.handleRestartClick}>
							Recommencer
						</button> :
	    				<Keyboard 
	    					letters={LETTERS} 
	    					testedLetters={testedLetters}
	    					onClick={this.handleLetterClick}
	    				/>
	    		}

	    	</div>
	  	)
	}

	/*	Gestionnaire de clic sur une lettre 	*/
	/* @autobind */
	handleLetterClick = letter => {
		const { mask, testedLetters, word } = this.state
		const newMask = this.revealLetter(letter)

		if(!testedLetters.includes(letter))
		{
			testedLetters.push(letter)

			this.setState({
				testedLetters: testedLetters,
				mask: newMask,
				won: word.every((char, index) => char === newMask[index] )
			})
		}
	}

	/*	Gestionnaire de l'évènement Recommencer*/
	/* @autobind */
	handleRestartClick = () => { 
		this.setState( this.getInitState() ) 
	}

	/*	Révèle la lettre en paramètres et retourne le nouveau masque	*/
	revealLetter( letter ){
		const { mask, word } = this.state

		return mask.map((char, i) => letter===word[i] ? word[i] : char)
	}

	/*	Renvoie un mot aléatoire de la liste locale	*/
	getRandomWord(){
		return Array.from(WORDS[ Math.floor(Math.random() * WORDS.length )]);
	}

	/*	Renvoie l'état initial	*/
	getInitState(){
		const word = this.getRandomWord()

		return { 
			word: word,
			mask: this.getInitialMask(word),
			testedLetters: [],
			won: false
		}
	}

	/*	Méthode retournant le mot masqué de départ	*/
	getInitialMask(word){
		return word.map((letter, index)=>[0,word.length-1].includes(index) ? letter : '_')
	}
}


const WORDS = [
	'MANGER',
	'BOIRE',
	'DORMIR',
	'POMME',
	'POIRE',
	'FRAISE',
	'FRAMBOISE',
	'SUPREME',
	'PALACE',
	'GUCCI'
]


export default App;
