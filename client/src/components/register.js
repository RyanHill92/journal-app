import React from 'react';
import axios from './../utils/axios-config';
import classNames from 'classnames';

const initialState = {
  email: '',
  password: '',
  confirm: '',
  errors: {}
};

//Will either get back an errors object with email, password, and/or password 2 fields
//OR
//An error object with errorMessage field.

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit (e) {
    e.preventDefault();

    const {email, password, confirm} = this.state;

    const registerObject = {
      email,
      password,
      confirm
    };

    axios.post('/api/users/register', registerObject)
      .then(res => {
        console.log(res.data);
        this.setState(initialState);
      })
      .catch(err => {
        let errors = !err.response ? err : err.response.data;
        this.setState({errors});
      });
  }

  render () {
    const {email, password, confirm, errors} = this.state;

    return(
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 m-auto" style={styles.form}>
            <h1 className="text-center">Sign Up for Memory Map</h1>
            <p><b>Instructions:</b> <em>Enter a valid email address and password to create your account.
              Passwords are case sensitive and must be between 6-30 characters in length.
            </em></p>
            <hr />
            <form
              onSubmit={e => this.onSubmit(e)}
              >
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={classNames('form-control', {
                    'is-invalid': errors.email
                  })}
                  value={email}
                  onChange={e => this.onChange(e)}
                  />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className={classNames('form-control', {
                    'is-invalid': errors.password
                  })}
                  value={password}
                  onChange={e => this.onChange(e)}
                  />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  className={classNames('form-control', {
                    'is-invalid': errors.confirm
                  })}
                  value={confirm}
                  onChange={e => this.onChange(e)}
                  />
                {errors.confirm && (
                  <div className="invalid-feedback">
                    {errors.confirm}
                  </div>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  form: {
    position: 'relative',
    margin: 'auto',
    top: '50px',
    left: 0,
    right: 0,
    bottom: 0
  }
}

export default Register;
