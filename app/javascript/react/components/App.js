import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import MoviesIndexPage from "./MoviesIndexPage"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MoviesIndexPage} />
        <Route exact path="/movies" component={MoviesIndexPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
