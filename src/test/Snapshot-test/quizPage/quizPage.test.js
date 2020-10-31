import { faItalic } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'

import QuizPage from '../../../routes/QuizPage/QuizPage';

it.only(`Snapshot test on Quiz Page to prevent unexpected change`,()=>{
    const myRenderedElement= renderer.create(
        <BrowserRouter>
            <QuizPage />
        </BrowserRouter>).toJSON();
    expect(myRenderedElement).toMatchSnapshot();
})