import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import PackageInfoView from "./components/PackageInfoView";
import PackageListView from "./components/PackageListView";

const styles = {
  body: { margin: 20 }
};

const App = () => {
  return (
    <div>
      <AppHeader />
      <div style={styles.body}>
        <Router>
          <Route exact path="/" component={PackageListView} />
          <Route exact path="/:packageName" component={PackageInfoView} />
        </Router>
      </div>
    </div>
  );
};

export default App;
