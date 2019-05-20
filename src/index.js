import io from 'socket.io-client';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
// import * as db from './services/datastore';
import AddNote from './components/add_note';
import Note from './components/note';


const socketserver = 'http://localhost:9090';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  componentDidMount(callback) {
    this.socket.on('notes', (notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  addNote = (fields) => {
    this.socket.emit('createNote', fields);
  }

  updateNote = (id, fields) => {
    this.socket.emit('updateNote', id, fields);
  }

  deleteNote = (id) => {
    this.socket.emit('deleteNote', id);
  }

  /*
  deleteAll = () => {
    //db.deleteAllNotes();
  }
  */

  render() {
    return (
      <div id="full-page">
        <AddNote onSubmit={this.addNote} />
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
