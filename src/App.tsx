import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "./App.css";
import PersonneList from "./pages/personne-list";
import PersonnesDetail from "./pages/personne-detail";
import PageNotFound from './pages/page-not-found';
import PersonneEdit from './pages/personne-edit';
import PersonneAdd from "./pages/personne-add";
import Login from './pages/login';
import PrivateRoute from'./PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center"></Link>
          </div>
        </nav>
        <Switch>
          <PrivateRoute exact path="/" component={PersonneList}/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/personnes" component={PersonneList}/>
          <PrivateRoute exact path="/personne/add" component={PersonneAdd}/>
          <PrivateRoute exact path="/personnes/edit/:id" component={PersonneEdit}/>
          <PrivateRoute path="/personnes/:id" component={PersonnesDetail}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
