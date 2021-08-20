import Maintemp from "./component/main/maintemp";
import SideInfo from "./component/sideInfo/sideInfo";
import Group from "./component/group/group";
import Header from "./component/header/header";
import ListView from "./component/list/listView";
import Word from "./component/word/word";
import File from "./component/upFile/file";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Search from "./component/search/search";
import ManageFile from "./component/manageFile/manageFile";


function App() {
  return (
    <Router>
      <div className="App">
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
            <Route path="/book">
              <File />
            </Route>
            <Route path="/manage">
              <ManageFile />
            </Route>
            <Route path="*">
              <div style={
                {
                  marginTop: "4em",
                  width: "50%",
                  height: "100vh",
                  textAlign : "center",
                  color: "white"
                }}>
                <h1>404</h1>
                <h1>Page not found</h1>
              </div>
            </Route>
          </Switch>
          <Search />
        </Maintemp>
      </div>
    </Router >
  );
}

export default App;
