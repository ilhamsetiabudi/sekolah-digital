import React from "react";
import {Link} from 'react-router-dom'

class Header extends React.Component {

  onSignOut () {
    localStorage.clear();
    //this.Props.history.push('/')
}

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#">
              <i class="fas fa-bars"></i>
            </a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="/home" class="nav-link">
              Home
            </a>
          </li>

        <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>


        <ul className="navbar-nav ml-auto">
          <div className="mr-2">
            <span>
              <Link class = 'nav-link' to = "" onClick = {this.onSignOut}>
              <i class="fas fa-sign-out-alt fa-2x"></i>
              </Link>
            </span>
          </div>
        </ul>
      </nav>
    );
  }
}

export default Header;
