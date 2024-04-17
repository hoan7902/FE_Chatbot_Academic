import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App';
import store from './store';
import { NewProvider } from './context'

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <NewProvider>
          <App />
        </NewProvider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  document.getElementById('root'),
);
