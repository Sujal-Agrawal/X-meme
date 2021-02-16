import './App.css';
import Forms from './Container/Forms/Forms';
import MemeBox from './Container/Memes/Memes';
import {Redirect, Route,Switch} from 'react-router-dom';
import NotFound from './Container/UI/NotFound/NotFound'
function App() {
  return (
    <div className="App">
      
      {/* <Forms />
      <MemeBox /> */}
      <Switch>
      <Route path="/" exact component={Forms} />
      {/* <Redirect from="/" to path="/Meme" /> */}
      <Route   component={NotFound} />
      </Switch>
  
    </div>
  );
}

export default App;
