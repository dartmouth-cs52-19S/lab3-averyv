import React, { Component } from 'react';

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onNoteAdd = this.onNoteAdd.bind(this);
    // this.onDelete = this.onDelete.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  onNoteAdd() {
    this.props.onSubmit(this.state.title);
    this.setState({ title: '' });
  }

  /*
  onDelete() {
    this.props.onDelete();
  }
  */

  render() {
    return (
      <form id="add-note">
        <input id="text-input" placeholder="Start typing to add a note..." type="text" onChange={this.onInputChange} value={this.state.title} />
        <button id="submit-button" type="button" onClick={this.onNoteAdd}>Submit</button>
      </form>
    );
  }
}


export default AddNote;
