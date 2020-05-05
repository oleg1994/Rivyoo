import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NewReview from './components/NewReview/NewReview';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Home></Home>
            <Footer></Footer>
          </Route>
          <Route path="/new-review">
            <Header></Header>
            <NewReview></NewReview>
            <Footer></Footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
