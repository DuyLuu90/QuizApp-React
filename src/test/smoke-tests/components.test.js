import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import NavBar from '../../component/app_nav/navBar'
import Footer from '../../component/app_footer/footer'
import RegForm from '../../../src/component/forms/regForm/regForm';
import LoginForm from '../../../src/component/forms/loginform/loginform';


describe(`All components render without crashing`,()=>{
    it('Nav component', () => {
        const div = document.createElement('div');
        ReactDOM.render(
          <BrowserRouter>
            <NavBar />
          </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('Footer component', () => {
        const div = document.createElement('div');
        ReactDOM.render(
          <BrowserRouter>
            <Footer />
          </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('RegForm component', () => {
        const div = document.createElement('div');
        ReactDOM.render(
          <BrowserRouter>
            <RegForm />
          </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('LoginForm component', () => {
        const div = document.createElement('div');
        ReactDOM.render(
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})