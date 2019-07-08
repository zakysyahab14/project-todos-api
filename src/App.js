import React from "react";
import axios from "axios";
// import { AddList } from "./components/js/AddTodos";
import AddList from "./components/js/AddTodos";
import './App.css';

const API_STRING = `https://haekal-todo-list-api.herokuapp.com/todos`;

export class ActivityTodos extends React.Component {
  state = {
    activity: []
  };

  componentDidMount() {
    axios.get(API_STRING).then(res => {
      const activity = res.data;
      this.setState({ activity });
      console.log(API_STRING);
    });
  }

  render() {
    return (
      <div>
        <div>
        <AddList />
      </div>
      {/* <div>
        <table>
          <td>
          <ul>
            <p>Activity Name</p>
            {this.state.activity.length > 0 &&
              this.state.activity.map(activity => <li>{activity.description}</li>)}
          </ul>
          </td>
          <td>
          <ul>
          <p>DONE</p>
            {this.state.activity.length > 0 &&
              this.state.activity.map(activity => <li>{activity.done === true ? 'V' : 'X'}</li>)}
          </ul>
          </td>
        
          </table>
      </div> */}
      </div>
    );

  }
}
export default ActivityTodos;
