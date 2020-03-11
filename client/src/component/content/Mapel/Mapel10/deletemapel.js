import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../../config/api.config.json'

class DeletMahasiswa extends React.Component {
    constructor (props) {
        super (props)
        this.state ={
            formdata: {
                kode_mapel : ''
            }
        }
        this.deletHandler = this.deletHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            formdata : newProps.listsiswa
        })
    }

    deletHandler() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAPELX,
            method : "delete",
            headers : {
                "Authorization" : token,
                "Content-Type" : "application/json"
            },
            data : this.state.formdata
        }

        axios (option)
        .then((response) => {
            alert ("Sukses")
            this.props.modalStatus()
        })
        .catch ((error) => {
            alert (error)
        })
    }

    render () {
        return (
            <Modal isOpen = {this.props.delete} className = {this.props.className}>
                <ModalHeader>Delete Mata Pelajaran</ModalHeader>
                <ModalBody>
                    <p> Delete ? </p>
                </ModalBody>
                <ModalFooter>
                    <Button color = "primary" onClick = {this.deletHandler}>Yes</Button>
                    <Button color = "danger" onClick = {this.props.modalStatus}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

export default DeletMahasiswa