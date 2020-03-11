import React from 'react'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../config/api.config.json'
import Select from "react-select";


class Editsiswa extends React.Component {
    constructor (props){
        super(props)
       // let userdata = JSON.parse(localStorage.getItem(apiConfig.LS.USERDATA))
        this.state = {
            formdata : {
                no_siswa:'',
                nama_siswa:'',
                username:'',
                password:'',
                //update_by:userdata.username
            },
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    validate(){
      let nameError =""
          if (!this.state.formdata.no_siswa || !this.state.formdata.nama_siswa||!this.state.formdata.username||!this.state.formdata.password){
          nameError = "Semua field Harus Diisi"
      } 
      if (nameError){
        this.state.formdata.nameError = nameError
        return false
      }
      return true
    }

    componentWillReceiveProps(newprops) {
        this.setState({
            formdata : newprops.listsiswa,
        })
    }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata:tmp
        })
    }

    submitHandler= event =>{
    //    let kota = this.state.selectedOption2.value
    //     let tmp = this.state.formdata
    //     tmp.kd_kota = kota
    //     let provinsi = this.state.selectedOption.value
    //     tmp.kd_prov = provinsi
    //     this.setState({
    //        formdata : tmp
    //        })
      event.preventDefault();
      event.target.className += " was-validated";
      const isValid = this.validate()
      
          if (isValid == false){
            // alert(this.state.formdata.nameError)

          }else{ 
            let tmp = this.state.formdata
      this.setState({
        formdata : tmp
    })
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.SISWA,
            method : "put",
            headers:{
                "authorization" : token,
                "Content-type": "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((Response)=> {
            if(Response.data.code == 200){
                alert('Succes')
                this.props.modalStatus()
            }else{
                alert(Response.data.message)
            }
        })
        .catch((error) =>{
            console.log(error);
        })
      }
    }
    render(){
        return(
           <Modal isOpen = {this.props.edit} className={this.props.className}>
             <form role = "form" className="needs-validation" onSubmit={this.submitHandler} noValidate>
                <ModalHeader>Edit Siswa </ModalHeader>
                <ModalBody>
                {/* <form role = "form"> */}
                    <div class ="form-group">
                        <label for="text"> No Siswa : </label>
                        <input type="text" class="form-control" readOnly
                        name="no_siswa" 
                        value={this.props.listsiswa.no_siswa} 
                        onChange={this.changeHandler}
                         />
                        </div>
                    <div class ="form-group"> 
                        <label for="text"> Nama Siswa : </label>
                        <input type="text" class="form-control" placeholder="Nama Siswa" 
                        name="nama_siswa"
                        value={this.props.listsiswa.nama_siswa} 
                        onChange={this.changeHandler}
                         />
                    </div>

                    <div class ="form-group"> 
                    <label for="text"> username : </label>
                        <input type="text" class="form-control" placeholder="usernmae" 
                        name="username"
                        value={this.props.listsiswa.username} 
                        onChange={this.changeHandler}
                        />
                    </div>

                    <div class ="form-group">
                    <label for="text"> password : </label>
                        <input type="text" class="form-control" placeholder="Password" 
                        name="password" 
                        value={this.props.listsiswa.password} 
                        onChange={this.changeHandler}
                        />
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">Save</Button> 
                    <Button color="danger" onClick={this.props.modalStatus}>Cancel</Button>
                    </ModalFooter>
                    
                    </form>

            </Modal>
        )
    }
}
export default Editsiswa