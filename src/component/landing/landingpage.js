//import { render } from 'enzyme';
import React from 'react';
import {Link} from 'react-router-dom'
import './landing.css'
import landing from '../../assets/landing.PNG'

export default class LandingPage extends React.Component {
	render() {
		return (
			<div id='landing'>
				<h1>WORK HARD PLAY HARDER</h1>
                <div>
                    <img src={landing} alt='landing'/>
                </div>
				<div id='landing-message'>
          			As <strong>software developers</strong>, we love to learn and have fun and what better way to do that than to play a round of trivia. Playing trivia isn't just a fun way to learn something new but also a great way to take a little break from normal work task.
				</div>
				<div id='landing-nav'>
					<Link to='/quiz' aria-label='quiz'>AGREE</Link>
				</div>
      		</div>
		)
	}
}

