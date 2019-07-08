import React from "react";
import axios from "axios";
import "../../App.css";

const API_STRING = `Https://haekal-todo-list-api.herokuapp.com/todos`;

export class AddList extends React.Component {
  state = {
    description: "",
    done: true,
    data: []
  };

  componentDidMount() {
    axios.get(API_STRING).then(res => {
      const data = res.data;
      this.setState({ data });
      console.log(API_STRING);
    });
  }

  handleChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(API_STRING, { description: this.state.description })
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  };

  getIndex = index => {
    axios
      .delete(`Https://haekal-todo-list-api.herokuapp.com/todos/${index}`)
      .then(response => {
        this.setState({
          data: response.data
        });
        if (response.status === 200) {
          alert("Deleted");
        }
        window.location.reload()
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Activity name:</label>
          <input type="text" name="name" onChange={this.handleChange} />
          <button type="submit">Add Activity</button>
        </form>

        {this.state.data && (
          <pre>
            <code>{JSON.stringify(this.state.data)}</code>
          </pre>
        )}

        <table>
          <td>
            <ul>
              <p>Activity Name</p>
              {this.state.data.length > 0 &&
                this.state.data.map(activity => (
                  <li>
                  <div>{activity.description}</div>
                  <div>update</div>
                  </li>
                ))}
            </ul>
          </td>
          <td>
            <div>
              <ul>
                <p>DONE</p>
                {this.state.data.length > 0 &&
                  this.state.data.map(activity => (
                    <li>
                    <div>{activity.done === true ? "V" : "X"}</div>
                    <div>update</div>
                    </li>
                  ))}
              </ul>
            </div>
          </td>

          <td>
            <div>
              <p>Delete</p>
              {this.state.data.map((data, index) => {
                return (
                  <div key={index} className="HoverDelete">
                    <ul>
                      <li>
                        <div>{data.index} </div>
                        <div className="HoverDelete" onClick={() => this.getIndex(index)}
                        >
                          MARK AS DONE
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </td>
        </table>
      </div>
    );
  }
}
export default AddList;
