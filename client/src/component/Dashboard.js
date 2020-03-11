import React from 'react'
import {Switch, Route} from 'react-router-dom'
import apiconfig from '../config/api.config.json'
import Header from './Header'
import Sidebar from './Sidebar'
import home from './home'
import siswa from './content/mahasiswa/ListSiswa'
import mapelx from './content/Mapel/Mapel10/listmapel'
import guru from './content/user/ListUser'
import Footer from "../component/Footer";
import {Redirect} from 'react-router'

class Dashboard extends React.Component {
    render () {
        return (
            <div class="wrapper">
                <Header/>
                <Sidebar/>
                <div class = "content-wrapper">
                    <section class="content">
                        <div class="container-fluid">
                            <Switch>
                                <Route exact path = '/home' component={home}/>
                                <Route exact path = '/siswa' component = {siswa}/>
                                <Route exact path = '/guru' component = {guru}/>
                                <Route exact path = '/mapelx' component = {mapelx}/>
                            </Switch>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        )
    }
}

// const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render = {props => localStorage.getItem(apiconfig.LS.TOKEN) != null? (<Component {...props}/>
//     ) : (<Redirect to = {{pathname: '/', state: {from : props.location}}}/>
//     )}/>
// );

export default Dashboard