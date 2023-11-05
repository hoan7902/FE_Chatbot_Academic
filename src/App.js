import './App.css';
import { Route } from 'react-router-dom';
import ChatPage from './Pages/Chatpage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ChatPage} exact />
    </div>
  );
}

export default App;
