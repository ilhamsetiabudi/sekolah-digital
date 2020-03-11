import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      productsList :[
        {name: 'USS Seawolf class', isChecked: false},
        {name: 'USS Skipjack', isChecked: false},
        {name: 'USS Lafayette', isChecked: false},
        {name: 'USS Ohio class', isChecked: false},
      ]
    }
  }
  
  onAddingItem = (i) => (event) => {
    this.setState((state, props) => {
      state.productsList[i].isChecked = !state.productsList[i].isChecked;
      return {
        productsList: state.productsList
      }
    })
  }

  render() {
    let {productsList} =  this.state;
    return (
      <table>
        <tbody>
          { productsList.map((product, i) =>{
            return(
              <tr key={i+1}>
                <td>{i+1}</td>
                <td>{product.name}</td>
                <td>
                    <div class="checkbox checkbox-circle checkbox-color-scheme">
                        <label class="checkbox-checked">
                            <input type="checkbox" value={product.name} checked={product.isChecked} onChange={this.onAddingItem(i)}/> <span class="label-text">Add ?</span>
                        </label>
                    </div>
                </td>
            </tr>
            )
          })}
          
        </tbody>
      </table>
    )
  }
}

ReactDom.render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>,
  document.getElementById("app")
)