import React from "react";
import apiconfig from '../config/api.config.json'

class Sidebar extends React.Component {
  render() {
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
    return (
      <aside className="main-sidebar elevation-4 sidebar-dark-primary">
        <a href="#" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">Sekolah Digital</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="./dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              ></img>
            </div>
            <div className="info">
              <a href="#" className="d-block">
              {userdata[0].fullname}
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column nav-flat"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Widgets
                    <span className="right badge badge-danger">New</span>
                  </p>
                </a>
              </li> */}
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-user"></i>
                  <p>
                    User
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/guru" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Guru</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Siswa</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy"></i>
                  <p>
                    Mata Pelajaran
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/mapelx" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas X</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mapel11a" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas XI IPA</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mapel11s" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas XI IPS</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mapel12a" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas XII IPA</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/mapel12a" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas XII IPS</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-calendar"></i>
                  <p>
                    Jadwal
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/guru" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas X</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas XI</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kelas XII</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-star"></i>
                  <p>
                    Ekstra Kurikuler
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/guru" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Daftar Ekskul</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Paskibra</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Pramuka</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Karya Ilmiah</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Palang Merah</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kesenian</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Sepak Bola/Futsal</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Bela Diri</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kesenian</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/siswa" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Bola Basket</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
