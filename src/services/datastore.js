import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBVvp7saLmdomx70bCkpwF5Bc_Nj4T9Dg8',
  authDomain: 'react-notes-2d8bb.firebaseapp.com',
  databaseURL: 'https://react-notes-2d8bb.firebaseio.com',
  projectId: 'react-notes-2d8bb',
  storageBucket: 'react-notes-2d8bb.appspot.com',
  messagingSenderId: '882630708994',
};
Firebase.initializeApp(config);

const database = Firebase.database();
// eslint-disable-next-line import/prefer-default-export
export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function addNote(term) {
  // eslint-disable-next-line prefer-const
  let newNote = {
    title: term, text: '', x: 0, y: 0, zIndex: 0, width: 300, height: 200, starred: false,
  };
  database.ref('notes').push(newNote);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNote(id, fields) {
  database.ref('notes').child(id).update(fields);
}

export function deleteAllNotes() {
  database.ref('notes').remove();
}
