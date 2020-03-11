import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../../config/api.config.json'

class EditUser extends React.Component{
    constructor(props){
        super(props)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))

        this.state = {
            formdata: {
                kode_mapel: '',
                nama_mapel: '',
                nama_guru: '',

                // update_by:userdata.username
            }
        }

        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            formdata : newProps.listuser
        })
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
            url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAPELX, method: 'put',
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
        <Modal isOpen = {this.props.edit} className={this.props.className}>
            <ModalHeader>Edit Mata Pelajaran</ModalHeader>
            <ModalBody>

            <form role="form">
            <div class="form-group">
                    <label for="kode_mapel">Kode Mata Pelajaran</label>
                    <input
                        type="text"
                        class="form-control"
                        name="kode_mapel"
                        value={this.props.listuser.kode_mapel}
                        onChange = {this.changeHandler}
                        />
                    </div>
                    <div class="form-group">
                    <label for="nama_mapel">Mata Pelajaran</label>
                    <input
                        type="text"
                        class="form-control"
                        name="nama_mapel"
                        value={this.props.listuser.nama_mapel}
                        onChange = {this.changeHandler}
                        />
                    </div>
                    <div class="form-group">
                    <label for="nama_guru">Guru</label>
                    <input
                        type="text"
                        class="form-control"
                        name="nama_guru"
                        value={this.props.listuser.nama_guru}
                        onChange = {this.changeHandler}
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

export default EditUser