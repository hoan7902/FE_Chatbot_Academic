/* eslint-disable no-unused-vars */
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import ChatPage from './Pages/Chatpage';
import AuthPage from './Pages/Authpage';
import { newContext } from './context';

function App() {
  const userId = localStorage.getItem('userId');
  const { reloadPage, reload } = useContext(newContext)

  return (
    <div className="App">
      <Route
        path="/"
        exact
        render={() => (userId ? <Redirect to="/chat" /> : <AuthPage reloadPage={reloadPage} reload={reload} />)}
      />
      <Route
        path="/chat"
        exact
        render={() => (userId ? <ChatPage reloadPage={reloadPage} reload={reload} /> : <Redirect to="/" />)}
      />
    </div>
  );
}

export default App;
