import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact"
import axios from 'axios'
import Select from "react-select";
import apiconfig from '../../../config/api.config.json'

class ViewSiswa extends React.Component {
    constructor (props) {
        super (props)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
    }

    
    render () {
                return (
            <Modal isOpen = {this.props.view} className = {this.props.className}>
                <ModalHeader>View Unit</ModalHeader>
                <ModalBody>
                    
                <form>
                  <div class="row">
                    <div class="col">
                      <label for="no_siswa">No Siswa</label>
                            <input
                                type="text"
                                class="form-control"
                                name="no_siswa"
                                value={this.props.listsiswa.no_siswa}
                            />
                        </div>
                          <div class="col">
                          <label for="nama_siswa">Nama Siswa</label>
                            <input
                                type="text"
                                class="form-control"
                                name="nama_siswa"
                                value={this.props.listsiswa.nama_siswa}
                            />
                        </div>
                      </div>
                    </form>

                            <div class="form-group">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                name="username"
                                value={this.props.listsiswa.username}
                                onChange={this.changeHandler}
                            />
                        </div>
            <form>
                  <div class="row">
                    <div class="col">
                      <label for="password">Password</label>
                            <input
                                type="text"
                                class="form-control"
                                name="password"
                                value={this.props.listsiswa.password}
                            />
                        </div>
                      </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color = "danger" onClick = {this.props.modalStatus}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ViewSiswa