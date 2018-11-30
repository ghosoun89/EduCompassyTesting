import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

import Home from './components/Home.jsx';
import Parents from './components/Parents.jsx';
import Teachers from './components/Teachers.jsx';
import Admin from './components/Admin.jsx';
import About from './components/About.jsx';
import Signin from './components/Signin.jsx';

class App extends Component {
  state = {
    post: '',
    get: '',
    responseToPost: 'Click the button to Post',
    responseToGet: 'Click the button to Get',
    responseToGetAuto: 'This will Auto Change',
  };

  /*
  Read about:
  componentDidMount()
  https://reactjs.org/docs/react-component.html#componentdidmount
  */
  componentDidMount() {
    this.callApiHi()
      .then(res => this.setState({ responseToGetAuto: res.express }))
      .catch(err => console.log(err));
  }


  /*
    
    MDN Fetch() / jquery ajax()
    
    Read about Fetch API: 
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    Read about async () =>
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

    Read about await:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

    Notes how this function invoked:

    - callApiHi on client load fetch for get /api/hi using componentDidMount()
    - handleSubmitGET on button "Get /api/hello" clicked (using fetch get)
    - handleSubmitPOST on button "Post /api/world" clicked (using fetch Post)
  */
  callApiHi = async () => {
    const response = await fetch('/api/hi');
    const body = await response.json();
    console.log("callApiHi body: ",body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  /*
  Read about Events Handling (In our case, Clicking the form submit button)
  Notes that we use variable e for event 
  
  e.preventDefault();
  https://reactjs.org/docs/handling-events.html


  */

  handleSubmitGET = async e => {
    e.preventDefault();
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("handleSubmitGET body: ",body);
    this.setState({ responseToGet: body.express });
  };

  handleSubmitPOST = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
    console.log("handleSubmitPOST body: ",body);

  };

  render() {
    return (
      <div className="App">
      {/* 
        Read New Semantic Elements in HTML5: (<header> <nav> <section> <footer>)
        https://www.w3schools.com/html/html5_semantic_elements.asp
      
      */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <hr />
          <nav>
          <button>Home</button>
          <button>Parents</button>
          <button>Teachers</button>
          <button>Admin</button>
          <button>Sign in</button>
          <button>About</button>
          </nav>       
        </header>
        <section>
          <hr />
          <Home />
          <hr />
          <Parents />
          <hr />
          <Teachers />
          <hr />
          <Admin />
          <hr />
          <Signin />
          <hr />
          <About />

        </section>
        <footer>
          <hr />
          <p>Have a nice day!</p>
        </footer>
        <hr />

        <h2>Testing Part:</h2>
        <div className="DivNotes">
          <h3>From componentDidMount() > callApiHi</h3>
          <p>{this.state.responseToGetAuto}</p>
        </div>
        
        <div className="DivNotes">
          <h3>Form Get:</h3>
          <form onSubmit={this.handleSubmitGET}>
            <p>
              <strong>Get From Server:</strong>
            </p>
            <button type="submit">Get /api/hello</button>
          </form>
          <p>{this.state.responseToGet}</p>
        </div>
        <div className="DivNotes">
          <h3>Form Post:</h3>
          <form onSubmit={this.handleSubmitPOST}>
            <p>
              <strong>Post to Server:</strong>
            </p>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Post /api/world</button>
          </form>
          <p>{this.state.responseToPost}</p>
        </div>
        
      </div>
    );
  }
}

export default App;
