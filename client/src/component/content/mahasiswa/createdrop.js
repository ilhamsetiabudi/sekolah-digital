import React from 'react'
import axios from 'axios'
import apiConfig from '../../../config/API.config.json'
import Select from "react-select";
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap'

class Createmahasiswa extends React.Component{
    constructor(props){
        super(props)
       // let userdata = JSON.parse(localStorage.getItem(apiConfig.LS.USERDATA))
        this.state = {
            formdata : {
                kd_mhs:'',
                nm_mhs:'',
                jk:'',
                alamat:'',
                kd_jurusan:'',
                kd_kota: '',
                //update_by:userdata.username
            },
            provinsi: [],
            kota: [],
            listKota: [],
            listProvinsi: [],
            selectedOption:{},
            selectedOption2:{}
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    handleChange1 = (selectedOption) => {
        this.setState({selectedOption});
      };
    
    handleChange2 = (selectedOption) => {
        this.setState({selectedOption2: selectedOption })
      }
    
    getProvinsi() {
        let token = localStorage.getItem(apiConfig.LS.TOKEN);
        let option = {
          url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.PROVINSI,
          method: "get",
          headers: {
            "authorization": token
          }
        };
    axios(option)
          .then(response => {
            let tmp = [];
    
            response.data.message.map(row => {
              tmp.push({
                value: row.kd_prov,
                label: row.nm_prov
              });
            });
            this.setState({
              listProvinsi: tmp,
              provinsi: response.data.message
            });
          })
          .catch(error => {
            alert(error);
          });
      }
    
    getKota() {
        let token = localStorage.getItem(apiConfig.LS.TOKEN);
        let option = {
          url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.KOTA,
          method: "get",
          headers: {
            "authorization": token
          }
        };
        axios(option)
          .then(response => {
            let tmp = [];
    
            response.data.message.map(row => {
              tmp.push({
                value: row.kd_kota,
                label: row.nm_kota,
                link : row.kd_prov
              });
            });
            this.setState({
              listKota: tmp,
              kota: response.data.message
            });
           
          })
          .catch(error => {
            alert(error);
          });
      }
    
    componentDidMount() {
        this.getProvinsi();
        this.getKota();
      }
    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
       // tmp["kd_kota"] = this.state.selectedOption.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
    let kota = this.state.selectedOption2.value
    let tmp = this.state.formdata
    tmp.kd_kota = kota
    this.setState({
        formdata : tmp
        })
       // alert(JSON.stringify(this.state.formdata))
        let token = localStorage.getItem(apiConfig.LS.TOKEN)
        let option = {
            url : apiConfig.BASE_URL+apiConfig.ENDPOINTS.MAHASISWA,
            method : "post",
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
               // alert(JSON.stringify(this.state.formdata))
            }else{
                alert(Response.data.message)
            }
        })
        .catch((error) =>{
            console.log(error);
        })
    }
    render(){
        const options1 = this.state.listProvinsi;
        const options2 =this.state.listKota;

        const filteredOptions = options2.filter(
        o => o.link === this.state.selectedOption.value)
        return(
            <Modal isOpen = {this.props.create} className={this.props.className}>
                 <ModalHeader>ADD Mahasiswa </ModalHeader>
            <ModalBody>
            <form role = "form">
                <div class ="form-group">
                    <label for="text"> Kode Mahasiswa : </label>
                    <input type="text" class="form-control" 
                    name="kd_mhs" 
                    value={this.state.formdata.kd_mhs} 
                    onChange={this.changeHandler}
                     />
                     </div>
                     <div class ="form-group">
                    <label for="text"> Nama Mahasiwa : </label>
                    <input type="text" class="form-control" placeholder="Type Name" 
                    name="nm_mhs"
                    value={this.state.formdata.nm_mhs} 
                    onChange={this.changeHandler}
                     />
                 </div>
                     <div class ="form-group">
                <label for="text"> Jenis Kelamin: </label>
                    <input type="text" class="form-control" placeholder="Jenis Kelamin" 
                    name="jk"
                    value={this.state.formdata.jk} 
                    onChange={this.changeHandler}
                    />
                     </div>
                     <div class ="form-group">  
                <label for="text"> Alamat : </label>
                    <input type="text" class="form-control" placeholder="Type address" 
                    name="alamat"
                    value={this.state.formdata.alamat} 
                    onChange={this.changeHandler}
                    />
                </div>
                     <div class ="form-group">
                <label for="text"> Kode jurusan : </label>
                    <input type="text" class="form-control" placeholder="Jurusan" 
                    name="kd_jurusan" 
                    value={this.state.formdata.kd_jurusan} 
                    onChange={this.changeHandler}
                    />
                     </div>
                     <div>
                     <label for="text"> Pilih Provinsi : </label>
                        <Select
                        name=""
                        value={this.state.selectedOption.kd_prov}
                        onChange={this.handleChange1}
                        options={options1}
                        />
                        </div>
                     <div class ="form-group"> 
                    <label for="text"> Kota : </label>
                        <Select type="text" class="form-control" placeholder="Pilih kota" 
                        name="kd_kota" 
                        value={this.state.selectedOption2.kd_kota} 
                        //onChange={this.changeHandler}
                        onChange={this.handleChange2}
                        options={filteredOptions}
                        />
                   </div>
                     {/* <div>
                        <p>Pilih kota</p>
                        <Select
                        name="kd_kota"
                        value={this.state.selectedOption2.kd_kota}
                        onChange={this.handleChange2}
                        options={filteredOptions}
                        />
                    </div> */}
                </form>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.submitHandler}>Save</Button> 
                <Button color="danger" onClick={this.props.modalStatus}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }

}

export default Createmahasiswa