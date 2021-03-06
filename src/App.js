import React from "react";
import { Container } from "react-bootstrap";
import LoginButton from "./Auth0/LoginButton";
import LogoutButton from "./Auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import GitHubJobList from "./GitHubJobs/GitHubJobList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarZJ from "./components/NavbarZJ";
import Weather from "./Weather/Weather";
import Recipes from "./Recipes/Recipes";
import QRCodeGeneration from "./QRCode/QRCodeGeneration";
import COVID from "./COVID/COVID";
import Movies from "./Movies/Movies";
import Jokes from "./Jokes/Jokes";
import News from "./News/News";

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Container className="my-4">
      {/* <AppNavbar /> */}
      {isAuthenticated && (
        <span className="mr-6">
          Welcome, {user.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      )}
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}

      <NavbarZJ />

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GitHubJobList} />
          <Route exact path="/GitHubJobList" component={GitHubJobList} />
          <Route exact path="/COVID" component={COVID} />
          <Route exact path="/Weather" component={Weather} />
          <Route exact path="/Movies" component={Movies} />
          <Route exact path="/Jokes" component={Jokes} />
          <Route exact path="/News" component={News} />
          <Route exact path="/QRCode" component={QRCodeGeneration} />
          <Route exact path="/Recipes/:cuisineType" component={Recipes} />
          {/* <Route
            exact
            path="/Recipes/Mediterranean"
            component={() => <Recipes cuisineType="Mediterranean" />}
          />
          <Route
            exact
            path="/Recipes/Caribbean"
            component={() => <Recipes cuisineType="Caribbean" />}
          />
          <Route
            exact
            path="/Recipes/Italian"
            component={() => <Recipes cuisineType="Italian" />}
          />
          <Route
            exact
            path="/Recipes/Japanese"
            component={() => <Recipes cuisineType="Japanese" />}
          /> */}
          <Route component={GitHubJobList} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
