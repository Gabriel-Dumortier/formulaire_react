import React from 'react';
import axios from 'axios'
import './App.css';

class App extends React.Component {

  constructor(props) {
  super(props);

  //this.setupReader()
  
	this.state = {
  	name: '',
  	email: '',
    message: '',
    phone: '',
    gdpr: false,
    /*selectedFile: undefined,
    imageBase64: '',
    initialImageBase64: '',
    pending: false,
    status: 'INIT',*/
	} 
  }


render() {
 return(
   <div className="App">
   <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
    </div>
    <div className="form-group">
      <label>Telephone</label>
      <input type="text" value={this.state.phone} onChange={this.onPhoneChange.bind(this)} />
    </div>

    {/**<div className="form-group">
      <label>Select an image</label>
      <input type="file" accept=".jpg, .png, .jpeg" onChange={this.onFileChange} />
    </div>**/}

    <div className="form-group">
      <label>gdpr</label>
      <input type="checkbox" onChange={this.onGdprChange.bind(this)}/>
    </div>

    <button type="submit" className="btn btn-primary" disabled={this.state.gdpr == false} >Submit</button>
    </form>
    </div>
 );
}

/*
setupReader() {
  this.reader = new FileReader();
  this.reader.addEventListener('load', (event) => {
  const { initialImageBase64 } = this.state;
  var { changedImage } = this.props;
  const imageBase64 = event.target.result;
  changedImage(imageBase64);
 if (initialImageBase64) {
  this.setState({ imageBase64 });
  } else {
  this.setState({ imageBase64, initialImageBase64: imageBase64 });
  }
  });
  }
 onChange(event) {
  const selectedFile = event.target.files[0];
  var { checkImageState } = this.props;
  if (selectedFile) {
  checkImageState('selected');
  } else {
  checkImageState('unselected');
  }
  if (selectedFile) {
  this.setState({
  selectedFile,
  initialImageBase64: ''
  });
 this.reader.readAsDataURL(selectedFile);
  }
  }
  */

  onNameChange(event) {
	  this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	  this.setState({email: event.target.value})
  }

  onMessageChange(event) {
    this.setState({message: event.target.value})
  }

  onPhoneChange(event) {
	  this.setState({phone: event.target.value})
  }
  
  onGdprChange(event) {
	  this.setState({gdpr: !this.state.gdpr})
  }

  handleSubmit(e){
    e.preventDefault();

    axios({
      method: "POST", 
      url:"http://dev21.honet.be:3002/send", 
      data:  this.state
    }).then((response)=>{
      console.log(response)
      if (response.data.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){  
    this.setState({name: '', email: '', message: '', phone: ''})
 }

}

export default App;