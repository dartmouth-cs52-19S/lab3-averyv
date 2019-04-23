import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import AddNote from './components/add_note';
import Note from './components/note';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  componentDidMount(callback) {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  addNote = (term) => {
    db.addNote(term);
  }

  updateNote = (id, fields) => {
    db.updateNote(id, fields);
  }

  deleteNote = (id) => {
    db.deleteNote(id);
  }

  deleteAll = () => {
    db.deleteAllNotes();
  }

  render() {
    return (
      <div id="full-page">
        <AddNote onSubmit={this.addNote} onDelete={this.deleteAll} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note key={id} id={id} note={note} onDelete={this.deleteNote} onUpdate={this.updateNote} />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
