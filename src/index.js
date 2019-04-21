import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import AddNote from './components/add_note';
import Note from './components/note';

let noteId = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
    this.addNewNote = this.addNewNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  addNewNote = (term) => {
    noteId += 1;
    // eslint-disable-next-line prefer-const
    let newNote = {
      title: term, text: '', x: 0, y: 0, zIndex: 0,
    };
    this.setState(prevState => ({
      notes: prevState.notes.set(noteId, newNote),
    }));
  }

  updateNote = (id, fields) => {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    }));
  }

  deleteNote = (id) => {
    this.setState(prevState => ({
      notes: prevState.notes.delete(id),
    }));
  }

  render() {
    return (
      <div id="full-page">
        <AddNote onSubmit={this.addNewNote} />
        <div id="note-component">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note id={id} note={note} delete={this.deleteNote} onUpdate={this.updateNote} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
