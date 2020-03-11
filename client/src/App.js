import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import apiconfig from './config/api.config.json'

class App extends React.Component {
    render() {
        return(
                <Switch>

                <Route exact path = '/' render = {() => (
                    localStorage.getItem(apiconfig.LS.TOKEN) == null ? (
                        <Route exact path = '/' component = {Login} />
                    ) : (
                        <Dashboard/>
                    )
                    )} />
                    <Dashboard/>

                </Switch>
        )
    }
}

export default App