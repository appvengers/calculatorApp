import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Api from './helpers/api-client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* it('check service add 5 and 5', async () => {
  const response = await Api.addOperation(5,5,"add");
  expect(response.result).toEqual("10");
});

it('check service subtract 15 and 2', async () => {
  const response = await Api.addOperation(15,2,"subtract");
  expect(response.result).toEqual("13");
}); */
