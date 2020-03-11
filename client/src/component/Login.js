import React from "react";
import API from "../helpers/API";
import config from "../config/api.config.json"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        username: "",
        password: ""
      },
      isRequest: false
    };
    this.onSignIn = this.onSignIn.bind(this);
    this.textChanged = this.textChanged.bind(this);
  }
  textChanged(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp
    });
  }
  async onSignIn() {
    this.setState({
      isRequest: true
    });

    let result = await API.login(
      this.state.formdata.username,
      this.state.formdata.password
    );

    if (result.code === 200) {
      localStorage.setItem(
        config.LS.USERDATA,
        JSON.stringify(result.message.userdata)
      );
      localStorage.setItem(config.LS.TOKEN, result.message.token);
      this.props.history.push('/home');
    } else {
      alert(result.message);
    }

    this.setState({
      isRequest: false
    });
  }

  render() {
    return (
      // <center>
      <body>
      <div id="card">
        <div id="card-content">
          <div id="card-title">
            <label>LOGIN</label>
            <div class="underline-title"></div>
          </div>
      <form method="post" class="form">
        <label for="user-email" style={{paddingTop:22+'px'}}>
            &nbsp;Username
          </label>
        <input id="username" 
        class="form-content" 
        type="username" name="username" 
        required=""
        autoFocus=""
        value={this.state.username}
        onChange={this.textChanged}
        />

        <div class="form-border"></div>
        <label for="user-password" 
        style={{paddingTop:22+'px'}}
        >&nbsp;Password
          </label>
        <input id="user-password" 
        class="form-content" 
        type="password" 
        name="password" 
        required=""
        autoFocus=""
        value={this.state.username}
        onChange={this.textChanged}
        />
        <div class="form-border"></div>
        <a href="#">
          <legend id="forgot-pass">Lupa Password</legend>
        </a>
        <input id="submit-btn" type="submit" name="submit" value="MASUK" 
         disabled={this.state.isRequest}
         onClick={this.onSignIn}
         />
        <a href="#" id="signup">Belum Ada Akun</a>
      </form>
    </div>
  </div>
</body>
    );
  }
}

export default Login;
