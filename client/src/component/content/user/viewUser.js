import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewUser extends React.Component {
    render () {
        return (
            <Modal isOpen = {this.props.view} className = {this.props.className}>
                <ModalHeader>View Unit</ModalHeader>
                <ModalBody>
                <form role="form">
            <div class="form-group">
                    <label for="no_guru">No Guru</label>
                    <input
                        type="text"
                        class="form-control"
                        name="no_guru"
                        value={this.props.listuser.no_guru}
                        />
                    </div>
                    <div class="form-group">
                    <label for="nama_guru">Nama Guru</label>
                    <input
                        type="text"
                        class="form-control"
                        name="nama_guru"
                        value={this.props.listuser.nama_guru}
                        />
                    </div>
                    <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        name="username"
                        value={this.props.listuser.username}
                        />
                    </div>

                    <div class="form-group">
                    <label for="Password">Password</label>
                    <input
                        type="text"
                        class="form-control"
                        name="password"
                        value={this.props.listuser.password}
                        />
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

export default ViewUser