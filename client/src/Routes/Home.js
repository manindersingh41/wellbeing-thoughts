
import React , { Component } from 'react';
import Nav from'../Components/Nav';


export default class Home extends Component {
    render() {
        return (
            <div>
            <Nav />
            <h2>You are not logged In</h2>
          </div>
        )
    }
}