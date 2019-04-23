import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';
import marked from 'marked';

// maxZIndex will be used to deal with zIndex sorting when dragging a note
let maxZIndex = 0;

class Note extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { isEditing: false };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.toggleStarred = this.toggleStarred.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  onDeleteClick() {
    this.props.onDelete(this.props.id);
  }

  onTitleChange(event) {
    this.props.onUpdate(this.props.id, { title: event.target.value });
  }

  onTextChange(event) {
    this.props.onUpdate(this.props.id, { text: event.target.value });
  }

  // onStartDrag pops a note to the front when it is dragged
  onStartDrag() {
    maxZIndex += 1;
    this.props.onUpdate(this.props.id, { zIndex: maxZIndex });
  }

  onDrag(e, ui) {
    maxZIndex += 1;
    this.props.onUpdate(this.props.id, { x: ui.x, y: ui.y });
  }

  onResizeStop(e, direction, ref, d) {
    this.props.onUpdate(this.props.id, { width: this.props.note.width + d.width, height: this.props.note.height + d.height });
  }

  // toggleStarred toggles whether or not a note should be starred
  toggleStarred(event) {
    if (this.props.note.starred) {
      this.props.onUpdate(this.props.id, { starred: false });
    } else {
      this.props.onUpdate(this.props.id, { starred: true });
    }
  }

  /*
  This method toggles the isEditing state of a particular note, which will be used to render
  different elements based on whether or note the note is currently being edited.
  I looked at https://stackoverflow.com/questions/40359800/how-to-toggle-boolean-state-of-react-component to
  figure out how to toggle the boolean state of a React component
  */
  toggleEditing() {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  renderStarred() {
    if (this.props.note.starred) {
      return (
        <button className="star-button" id="starred-container" type="button" onClick={this.toggleStarred}><i className="far fa-star" /></button>
      );
    } else {
      return (
        <button className="star-button" id="not-starred-container" type="button" onClick={this.toggleStarred}><i className="far fa-star" /></button>
      );
    }
  }

  // The following three render methods return different JSX based on whether a note is currently being edited
  renderTitle() {
    if (this.state.isEditing) {
      return (
        <input type="text" onChange={this.onTitleChange} className="title" value={this.props.note.title} />
      );
    } else {
      return (
        <p className="title">{this.props.note.title}</p>
      );
    }
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return (
        <button type="button" onClick={this.toggleEditing}><i className="fas fa-check-circle" /></button>
      );
    } else {
      return (
        <button type="button" onClick={this.toggleEditing}><i className="fas fa-edit" /></button>
      );
    }
  }

  renderText() {
    if (this.state.isEditing) {
      return (
        /*
        I looked at the documentation of TextareaAutosize (at https://github.com/andreypopp/react-textarea-autosize)
         to better understand how to implement this component
        */
        <TextareaAutosize className="note-body text" value={this.props.note.text} onChange={this.onTextChange} />
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div className="note-body" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
      );
    }
  }

  /*
  To understand how to implement a draggable note, I looked at the code provided in the instructions, as well as
  the react-draggable documentation at https://github.com/mzabriskie/react-draggable.
  To make the note resizable, I looked at the documentation and example code for re-resizable at
  https://github.com/bokuweb/re-resizable.
  */
  render() {
    return (
      <Draggable
        handle=".class-of-note-mover-element"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
      >
        <Resizable
          className="note-detail"
          id={this.props.id}
          style={{ zIndex: this.props.note.zIndex, position: 'absolute' }}
          size={{ width: this.props.note.width, height: this.props.note.height }}
          minWidth={250}
          minHeight={200}
          enable={{
            top: false, right: true, bottom: true, left: false, topRight: false, bottomRight: true, bottomLeft: false,
          }}
          onResizeStop={this.onResizeStop}
        >
          <div id="title-component">
            {this.renderTitle()}
            <div id="button-container">
              {this.renderEditButton()}
              <button id="delete-note" type="button" onClick={this.onDeleteClick}><i className="far fa-window-close" /></button>
              <button id="move-note" className="class-of-note-mover-element" type="button"><i className="fas fa-arrows-alt" /></button>
            </div>
          </div>
          {this.renderText()}
          {this.renderStarred()}
        </Resizable>
      </Draggable>
    );
  }
}

export default Note;
