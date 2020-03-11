import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../config/api.config.json'

class CreateSiswa extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formdata: {
                no_siswa: '',
                nama_siswa: '',
                username: '',
                password: '',
                status: 'unlocked',
                login_ke: '0',
                is_delete: 'false'
                // update_by:userdata.username
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(e){
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp
        })
    }

    submitHandler(){
            let token = localStorage.getItem(apiconfig.LS.TOKEN)
            let option = {
                url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.SISWA, method: 'post',
                header:{
                    'Authorization': token,
                    'Content-Type' : 'application/json'
                },
                data:this.state.formdata
            }
        axios(option)
        .then((response) =>{
            if(response.data.code === 200) {
            alert('Success')
            this.props.modalStatus()
            } else {
                alert(response.data.message)
            }
    })
    .catch((error) => {
        console.log(error)
    })
}
render (){
    return(
        <Modal isOpen = {this.props.create} className={this.props.className}>
            <ModalHeader>Edit Siswa</ModalHeader>
            <ModalBody>
            <form class="form-inline">
            <div class="form-group">
                            <label for="no_siswa">No Siswa</label>
                            <input
                                type="text"
                                class="form-control"
                                name="no_siswa"
                                value={this.state.formdata.no_siswa}
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div class="form-group">
                            <label for="nama_siswa">Nama Siswa</label>
                            <input
                                type="text"
                                class="form-control"
                                name="nama_siswa"
                                value={this.state.formdata.nama_siswa}
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div class="form-group">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                name="username"
                                value={this.state.formdata.username}
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                type="text"
                                class="form-control"
                                name="password"
                                value={this.state.formdata.password}
                                onChange={this.changeHandler}
                            />
                        </div>
                    </form>

                <ModalFooter>
                    <Button color ='primary' onClick = {this.submitHandler}>Save</Button>
                    <Button color = 'danger' onClick = {this.props.modalStatus}>Close</Button>
                </ModalFooter>
            </ModalBody>
        </Modal>

    )
    }
}

export default CreateSiswa
