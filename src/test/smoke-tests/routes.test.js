import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import LandingPage from '../../routes/LandingPage/landingpage';
import QuizPage from '../../routes/QuizPage/QuizPage';
import NotFoundPage from '../../routes/NotFoundPage/notfoundpage';

describe(`All routes render without crashing`,()=>{
  it('Landing Page', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Quiz Page', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('NotFound Page', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
