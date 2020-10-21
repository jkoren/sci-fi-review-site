import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import MoviesIndexPage from "./MoviesIndexPage"
import MoviesFormContainer from "./MoviesFormContainer"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MoviesIndexPage} />
        <Route exact path="/movies" component={MoviesIndexPage} />
        <Route exact path="/movies/new" component={MoviesFormContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
