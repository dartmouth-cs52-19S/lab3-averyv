import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import marked from 'marked';

let maxIndex = 0;
class Note extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { isEditing: false };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderText = this.renderText.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.delete(this.props.id);
  }

  onTitleChange(event) {
    this.props.onUpdate(this.props.id, { title: event.target.value });
  }

  onTextChange(event) {
    this.props.onUpdate(this.props.id, { text: event.target.value });
  }

  onDrag(e, ui) {
    maxIndex += 1;
    this.props.onUpdate(this.props.id, { x: ui.x, y: ui.y, zIndex: maxIndex });
  }

  toggleEditing() {
    /* https://stackoverflow.com/questions/40359800/how-to-toggle-boolean-state-of-react-component */
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

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
        <TextareaAutosize className="text" value={this.props.note.text} onChange={this.onTextChange} />
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".class-of-note-mover-element"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div id={this.props.id} className="note-detail" style={{ zIndex: this.props.note.zIndex }}>
          <div id="title-component">
            {this.renderTitle()}
            <div id="button-container">
              {this.renderEditButton()}
              <button id="delete-note" type="button" onClick={this.onDeleteClick}><i className="far fa-window-close" /></button>
              <button id="move-note" className="class-of-note-mover-element" type="button"><i className="fas fa-arrows-alt" /></button>
            </div>
          </div>
          {this.renderText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
