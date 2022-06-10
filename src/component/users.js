import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../store/action/userAction";
import { regions } from "../mockData";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

class Users extends Component {
  state = {
    reg: [],
  };

  changeRegion = (event) => {
    this.setState({ reg: event.target.value });
  };
  componentDidMount() {
    this.props.getUsers(this.state.reg);
  }

  render() {
    const { users } = this.props.users;
    // console.log(users);

    return (
      <div role="main" className="container col-md-6 col-sm-4 mt-4 mainCompo">
        <div className="row">
          <h1 className="text-center text-white">Region Country</h1>

          <div className="form-group card card-body my-3 border-dark">
            <label for="region">Region</label>
            <select
              id="region"
              className="funcSelect"
              onChange={this.changeRegion}
            >
              {regions.map((u, key) => {
                return (
                  <option key={key} value={u.name}>
                    {u.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group card card-body my-3 border-dark">
            <label for="country">Country</label>
            <select id="country" className="">
              <option>--countries--</option>
              {users.map((e, key) => {
                if (e !== null && this.state.reg === e.region)
                  return <option key={key}>{e.name.common}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ users: state.users, error: state.error });

Users.propTypes = {
  reg: PropTypes.array,
  changeRegion: PropTypes.func,
  componentDidMount: PropTypes.func,
};

export default connect(mapStateToProps, { getUsers })(Users);
