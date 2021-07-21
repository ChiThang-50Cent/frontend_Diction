import Maintemp from "./component/main/maintemp";
import SideInfo from "./component/sideInfo/sideInfo";
import Group from "./component/group/group";
import Header from "./component/header/header";
import ListView from "./component/list/listView";
import Word from "./component/word/word";
import {
  BrowserRouter as Router,  
  Switch,
  Route
} from 'react-router-dom'
import Search from "./component/search/search";


function App() {
  return (
    <Router>
      <div className = "App">
      <SideInfo />
      <Maintemp>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Group />
          </Route>
          <Route path='/word/:wordId'>
            <Word />
          </Route>
          <Route path="/group/:groupId">
            <ListView />
          </Route>
        </Switch>
        <Search />
      </Maintemp>
      </div>
    </Router >
  );
}

export default App;
