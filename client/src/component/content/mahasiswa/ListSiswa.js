import React from 'react'
import apiconfig from '../../../config/api.config.json'
import ViewSiswa from './ViewSiswa'
import CreateSiswa from './CreateSiswa'
import EditSiswa from './EditSiwa'
import DeleteSiswa from './DeleteSiswa'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

class ListSiswa extends React.Component {
    constructor(props){
        super (props)
        this.state = {
            siswa : [],
            listsiswa: [],
            currentSiswa : {}
        }
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.deletedModalHandler = this.deletedModalHandler.bind(this)
        this.createModalHandler = this.createModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    getListSiswa () {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.SISWA,
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
                    <span onClick = {() => {this.viewModalHandler(row.no_siswa)}} class='fa fa-search'
                    style={{fontSize : '18px', paddingRight :'30px'}}/>
                    <span onClick = {() => {this.editModalHandler(row.no_siswa)}} class="fa fa-edit"
                    style={{fontSize : '18px', paddingRight: '30px'}}/>
                    <span onClick = {() => {this.deletedModalHandler(row.no_siswa)}} class="fa fa-trash"
                    style={{fontSize : '18px'}}/>
                    </Link>

                tmp.push({"no" : x+1, "no_siswa" : row.no_siswa, "nama_siswa" : row.nama_siswa, "username" : row.username, "password" : row.password, customButton})
            })

            this.setState({
                listsiswa : tmp,
                siswa : response.data.message
            })
        })

        .catch ((error) => {
            alert(error)
        })
    }
    
    componentDidMount () {
        this.getListSiswa()
    }

    createModalHandler() {
        this.setState({
            CreateSiswa : true
        })
    }

    viewModalHandler (no_siswa) {
        let tmp = {}
        this.state.siswa.map((ele) => {
            if (no_siswa == ele.no_siswa) {
                tmp = ele
            }
        })
        this.setState({
            currentSiswa : tmp,
            viewSiswa : true
        })
    }

    editModalHandler (no_siswa){
        let tmp = {}
        this.state.siswa.map((ele) => {
            if (no_siswa == ele.no_siswa){
                this.setState({
                    currentSiswa : ele,
                    editSiswa : true
                })
            }
        })
    }

    deletedModalHandler(no_siswa) {
        this.state.siswa.map((ele) => {
            if (no_siswa == ele.no_siswa) {
                this.setState ({
                    currentSiswa : ele,
                    deleteSiswa : true
                })
            }
        })
    }

    modalStatus() {
        this.setState ({
            createSiswa : false,
            viewSiswa : false,
            editSiswa : false,
            deleteSiswa : false
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
               label : "No Siswa",
               field : "no_siswa",
               sort : "asc",
               width : 100 
            },{
                label : "Nama Siswa",
                field : "nama_siswa",
                sort : "asc",
                width : 200
            },{
                label : "Username",
                field : "username",
                sort : "asc",
                width : 200
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
        rows : this.state.listsiswa
        }

        return (
            <div>
                <button type = 'button' class = 'btn btn-primary float-right'
                onClick = {this.createModalHandler}> Add</button>
                <CreateSiswa
                  create = {this.state.createSiswa}
                  modalStatus = {this.modalStatus}
              />

                <ViewSiswa
                    listsiswa = {this.state.currentSiswa}
                    view = {this.state.viewSiswa}
                    modalStatus = {this.modalStatus}
                />
                
                <EditSiswa
                edit = {this.state.editSiswa}
                modalStatus = {this.modalStatus}
                listsiswa = {this.state.currentSiswa}
                />

                <DeleteSiswa
                delete ={this.state.deleteSiswa}
                modalStatus = {this.modalStatus}
                listsiswa = {this.state.currentSiswa}
                /> 

                <MDBDataTable striped bordered hover data = {data}/>
            </div>
        )
    }
}

export default ListSiswa