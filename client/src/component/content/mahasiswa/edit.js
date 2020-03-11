import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact"
import axios from 'axios'
import apiconfig from '../../../config/api.config.json'
import Select from "react-select"

class EditMahasiswa extends React.Component {
    constructor (props) {
        super (props)
        let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        this.state ={
            formdata: {
                kode_mahasiswa : '',
                nama_mahasiswa : '',
                alamat : '',
                kode_agama : '',
                kode_jurusan : '',
                kode_kota: '',
                jenis_kelamin: '',
                hobi: ''
            },
            provinsi: [],
            kota: [],
            listKota: [],
            listProvinsi: [],
            selectedOption:{},
            selectedOption2:{},
            selectedValue: "",
            selectedValue2: "",
            productsListNew : []
            
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
    }

    handleChange1 = selectedOption => {
        this.setState({ selectedValue: selectedOption.value });
        let tmp = this.state.formdata
        tmp["kode_provinsi"] = selectedOption.value
    };
    handleChange2 = selectedOption => {
        this.setState({ selectedValue2: selectedOption.value });
        let tmp = this.state.formdata
        tmp["kode_kota"] = selectedOption.value
    };
    
    componentWillReceiveProps(newProps) {
        this.setState({
            formdata : newProps.listmahasiswa,
            productsListNew : newProps.productsList
        })

    }

    handleChange1 = (selectedOption) => {
        this.setState({selectedOption});
      };
    
    handleChange2 = (selectedOption) => {
        this.setState({selectedOption2: selectedOption })
      }
    
      getProvinsi() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.PROVINSI,
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        axios(option)
            .then(response => {
                let tmp = [];

                response.data.message.map(row => {
                    tmp.push({
                        value: row.kode_provinsi,
                        label: row.nama_provinsi
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
        let token = localStorage.getItem(apiconfig.LS.TOKEN);
        let option = {
            url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.KOTA,
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        axios(option)
            .then(response => {
                let tmp = [];

                response.data.message.map(row => {
                    tmp.push({
                        value: row.kode_kota,
                        label: row.nama_kota,
                        link: row.kode_provinsi
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

    handleOnChange(values) {
        this.setState({ values });
        }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp [e.target.name] = e.target.value
        this.setState({
            formdata : tmp
        })
    }

    onAddingItem = (i) => (event) => {
        this.setState((state, props) => {
            this.props.productsList[i].isChecked = !this.props.productsList[i].isChecked;
          return {
            productsListNew : this.props.productsList
          }
        })
      }

        handleOnChange(values) {
            this.setState({ values });
        }

        changeHandler(e){
            let tmp = this.state.formdata
            tmp[e.target.name]=e.target.value
            this.setState({
                formdata : tmp
            })
    }

    submitHandler () {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let selectedProductsArray = this.state.productsListNew.filter((product, i)=>{
            return product.isChecked});
        let stringHobi = ''
        let tmp = this.state.formdata

        selectedProductsArray.map((row) => {
            if (stringHobi !== '') {
                stringHobi = stringHobi +', ' + row.name
            } else {
                stringHobi = row.name
            }
        })

        tmp['hobi'] = stringHobi
        
        this.setState({
            formdata : tmp
        })
        
        let option = {
            url : apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method : "put",
            headers : {
                "Authorization" : token,
                "content-type" : "application/json"
            },
            data : this.state.formdata
        }
        axios (option)
        .then ((response) => {
            if (response.data.code === 200) {
                alert('Success')
                this.props.modalStatus()
            } else {
                alert(response.data.message)
            }
        })
        .catch ((error) => {
            console.log(error)
        })
    }

    render () {
        const options1 = this.state.listProvinsi;
        const options2 =this.state.listKota;

        const filteredOptions = options2.filter(
        o => o.link === this.state.selectedOption.value)

        return (
            <Modal isOpen = {this.props.edit} className = {this.props.className}>
                <ModalHeader>Edit Mahasiswa</ModalHeader>
                <ModalBody>

                <form role="form">
                    <div class="form-group">
                    <label for="kode mahasiswa">Kode Mahasiswa</label>
                    <input
                        type="text"
                        class="form-control"
                        name="kode_mahasiswa" 
                        readOnly
                        value={this.props.listmahasiswa.kode_mahasiswa}
                        onChange = {this.changeHandler}
                    />
                    </div>
        
                    <div class="form-group">
                        <label for="Nama Mahasiswa">Nama Mahasiswa</label>
                        <input
                            type="text"
                            class="form-control"
                            name="nama_mahasiswa" 
                            value={this.props.listmahasiswa.nama_mahasiswa}
                            onChange = {this.changeHandler} 
                            />
                        </div>    

                        <div class="form-group">
                            <label for="Alamat">Alamat</label>
                            <input
                            type="text"
                            class="form-control"
                            name="alamat"
                            value={this.props.listmahasiswa.alamat}
                            onChange = {this.changeHandler} 
                            />
                        </div>

                        <label for="text"> Provinsi : </label>
                        <Select type="text" class="form-control" placeholder="Type address" 
                        name="nama_provinsi" 
                        value={options1.filter(({value}) => value === this.props.listmahasiswa.kode_provinsi)} 
                        onChange={this.handleChange1}
                        options={options1}
                        //onChange={this.changeHandler}
                        />
                   
                    
                    <label for="text"> Kota : </label>
                        <Select type="text" class="form-control" placeholder="Type address" 
                        name="kode_kota" 
                        value={options2.filter(({value}) => value === this.props.listmahasiswa.kode_kota)} 
                        //onChange={this.changeHandler}
                        onChange={this.handleChange2}
                        options={filteredOptions}
                        />


                        
                        <div class="form-group">
                        <label for="Kode Agama">Kode Agama</label>
                        <input
                            type="text"
                            class="form-control"
                            name="kode_agama"
                            value={this.props.listmahasiswa.kode_agama}
                            onChange={this.changeHandler}
                        />
                        </div>

                        <div class="form-group">
                            <label for="kode jurusan">Kode Jurusan</label>
                            <input
                                type="text"
                                class="form-control"
                                name="kode_jurusan"
                                value={this.props.listmahasiswa.kode_jurusan}
                                onChange={this.changeHandler}
                            />
                            </div>

                            <div class="form-group">
                            <label for="kode jurusan">Kode Kota</label>
                            <input
                                type="text"
                                class="form-control"
                                name="kode_kota"
                                value={this.props.listmahasiswa.kode_kota}
                                onChange={this.changeHandler}
                            />
                            </div>
                            
                            <div class="form-group">
            <label for="kode jurusan">Jenis Kelamin</label>
            </div>

                    <div class="form-group">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id='jenis_kelamin1' name = 'jenis_kelamin'
                            value='Laki-laki'
                            checked={this.props.listmahasiswa.jenis_kelamin === 'Laki-laki'}
                            onChange={this.changeHandler}
                            class='custom-control-input' required />
                            <label class='custom-control-label' for ='jenis_kelamin1'>Laki-laki</label>
                            </div>

                            <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id='jenis_kelamin2' name = 'jenis_kelamin'
                            value='Perempuan'
                            checked={this.props.listmahasiswa.jenis_kelamin === 'Perempuan'}
                            onChange={this.changeHandler}
                            class='custom-control-input' required />
                            <label class='custom-control-label' for ='jenis_kelamin2'>Perempuan</label>
                            </div>
                    </div>

                    <div class="form-group">
                            <label for="hobi">Hobi</label>
                            <table>
                                <tbody>
                                    {this.props.productsList.map((product, i) =>{
                                        return(
                                            <tr key={i+1}>
                                                <td>{product.name}</td>
                                                <td>
                                                    <div class="checkbox checkbox-circle checkbox-color-scheme">
                                                        <label class="checkbox-checked">
                                                            <input type="checkbox" 
                                                            value={product.name} 
                                                            checked={product.isChecked} 
                                                            onChange={this.onAddingItem(i)}/>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                            </div>

                    {/* <div class="form-group">
                        <label for="hobi">Hobi</label>
                        <div className="rainbow-p-vertical_large rainbow-p-left_xx-large">
                            <CheckboxGroup
                                id="checkbox-group-1"
                                options={options}
                                value={values}
                                onChange={this.handleOnChange}
                            />
                            </div>
                        </div> */}

                        </form>

                </ModalBody>
                <ModalFooter>
                    <Button color = "primary" onClick = {this.submitHandler}>Save</Button>
                    <Button color = "danger" onClick = {this.props.modalStatus}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default EditMahasiswa