import React from 'react'
import apiconfig from '../../../config/api.config.json'
import ViewUser from './viewUser'
import CreateUser from './createUser'
import EditUser from './editUser'
import DeleteUser from './deletUser'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

class ListUser extends React.Component {
    constructor(props){
        super (props)
        this.state = {
            user : [],
            listuser: [],
            currentUser : {}
        }
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.deletedModalHandler = this.deletedModalHandler.bind(this)
        this.createModalHandler = this.createModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    getListUser () {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.GURU,
            method : "get",
            headers : {
                "Authorization" : token
            }
        }

        axios(option)
        .then((response) => {
            let tmp = []

            response.data.message.map((row,x) => {
                    let customButton = <Link to = "#">
                    <span onClick = {() => {this.viewModalHandler(row.no_guru)}} class='fa fa-search'
                    style={{fontSize : '18px', paddingRight :'30px'}}/>
                    <span onClick = {() => {this.editModalHandler(row.no_guru)}} class="fa fa-edit"
                    style={{fontSize : '18px', paddingRight: '30px'}}/>
                    <span onClick = {() => {this.deletedModalHandler(row.no_guru)}} class="fa fa-trash"
                    style={{fontSize : '18px'}}/>
                    </Link>

                tmp.push({"no" : x+1, "no_guru" : row.no_guru, "nama_guru" : row.nama_guru, "username" : row.username, "password" : row.password, customButton})
            })

            this.setState({
                listuser : tmp,
                user : response.data.message
            })
        })

        .catch ((error) => {
            alert(error)
        })
    }
    
    componentDidMount () {
        this.getListUser()
    }

    createModalHandler() {
        this.setState({
            createUser : true
        })
    }

    viewModalHandler (no_guru) {
        let tmp = {}
        this.state.user.map((ele) => {
            if (no_guru == ele.no_guru) {
                tmp = ele
            }
        })
        this.setState({
            currentUser : tmp,
            viewUser : true
        })
    }

    editModalHandler (no_guru){
        let tmp = {}
        this.state.user.map((ele) => {
            if (no_guru == ele.no_guru){
                this.setState({
                    currentUser : ele,
                    editUser : true
                })
            }
        })
    }

    deletedModalHandler(no_guru) {
        this.state.user.map((ele) => {
            if (no_guru == ele.no_guru) {
                this.setState ({
                    currentUser : ele,
                    deletedUser : true
                })
            }
        })
    }

    modalStatus() {
        this.setState ({
            createUser : false,
            viewUser : false,
            editUser : false,
            deletedUser : false
        })
    }

    render () {
        const data = {
            columns : [{
                label : "No",
                field : "no",
                sort : "asc",
                width : 150
            },{
               label : "No Guru",
               field : "no_guru",
               sort : "asc",
               width : 100 
            },{
                label : "Username",
                field : "username",
                sort : "asc",
                width : 100 
            },{
                label : "Password",
                field : "password",
                sort : "asc",
                width : 200
            },{
                label : "Action",
                field : "customButton",
                sort : "asc",
                width : 100
            }],
        rows : this.state.listuser
        }

        return (
            <div>
                <button type = 'button' class = 'btn btn-primary float-right'
                onClick = {this.createModalHandler}> Add</button>
                <CreateUser
                  create = {this.state.createUser}
                  modalStatus = {this.modalStatus}
              />

                <ViewUser
                    listuser = {this.state.currentUser}
                    view = {this.state.viewUser}
                    modalStatus = {this.modalStatus}
                />
                
                <EditUser
                edit = {this.state.editUser}
                modalStatus = {this.modalStatus}
                listuser = {this.state.currentUser}
                />

                <DeleteUser
                delete ={this.state.deletedUser}
                modalStatus = {this.modalStatus}
                listuser = {this.state.currentUser}
                /> 

                <MDBDataTable striped bordered hover data = {data}/>
            </div>
        )
    }
}

export default ListUser