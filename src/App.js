import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message'
import db from './Firebase';
import firebase from 'firebase'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Enter your Nickname'))
  }, [])

  console.log(window.innerWidth)

  const sendMessage = (event) => {
    event.preventDefault()
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMessages([...messages, { username: username, message: input }])
    setInput('')
  }

  return (
    <div className='whole'>
      <div className='nav'>
        <div className='padding'>
          <img src='https://scontent.fbeg1-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-3&_nc_sid=6825c5&_nc_ohc=LAalZ1MnmfkAX-B0E6K&_nc_ht=scontent.fbeg1-1.fna&oh=850a4aeeed2bbf16945ddbda91aeea27&oe=60853FFD' />
          <h2>Hello {username}</h2>
          
        </div>
      </div>
      <div className={(window.innerWidth >=500) ? 'chat' : 'chatM'}>
        {
          messages.map(message => (
            <Message username={username} message={message} />
          ))
        }
      </div>
      <div className='form'>
        <form>
          <FormControl className='formControl'>
            <InputLabel >Enter a message</InputLabel>
            <Input className='inputField' value={input} onChange={e => setInput(e.target.value)} />
            <IconButton className='iconButton' disabled={!input} variant='contained' color='grey' type='submit' onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>
    </div>
  );
}

export default App;
