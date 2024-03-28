import { Provider } from 'react-redux';
import { store } from './store'
import './app.scss'
import Home from './Pages/Home';



function App() {
  

  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;