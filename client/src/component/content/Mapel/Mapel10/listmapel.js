import React from 'react'
import apiconfig from '../../../../config/api.config.json'
import CreateMapel from './createmapel'
import EditMapel from './updatemapel'
import DeleteMapel from './deletemapel'
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
        this.editModalHandler = this.editModalHandler.bind(this)
        this.deletedModalHandler = this.deletedModalHandler.bind(this)
        this.createModalHandler = this.createModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    getListUser () {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAPELX,
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
                    <span onClick = {() => {this.editModalHandler(row.kode_mapel)}} class="fa fa-edit"
                    style={{fontSize : '18px', paddingRight: '30px'}}/>
                    <span onClick = {() => {this.deletedModalHandler(row.kode_mapel)}} class="fa fa-trash"
                    style={{fontSize : '18px'}}/>
                    </Link>

                tmp.push({"no" : x+1, "kode_mapel" : row.kode_mapel, "nama_mapel" : row.nama_mapel, "nama_guru" : row.nama_guru, customButton})
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

    editModalHandler (kode_mapel){
        let tmp = {}
        this.state.user.map((ele) => {
            if (kode_mapel == ele.kode_mapel){
                this.setState({
                    currentUser : ele,
                    editUser : true
                })
            }
        })
    }

    deletedModalHandler(kode_mapel) {
        this.state.user.map((ele) => {
            if (kode_mapel == ele.kode_mapel) {
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
               label : "Kode Mata Pelajaran",
               field : "kode_mapel",
               sort : "asc",
               width : 100 
            },{
                label : "Mata Pelajaran",
                field : "nama_mapel",
                sort : "asc",
                width : 100 
            },{
                label : "Guru",
                field : "nama_guru",
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
                <CreateMapel
                  create = {this.state.createUser}
                  modalStatus = {this.modalStatus}
              />
               <EditMapel
                edit = {this.state.editUser}
                modalStatus = {this.modalStatus}
                listuser = {this.state.currentUser}
                />

                <DeleteMapel
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