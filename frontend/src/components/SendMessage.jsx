import React, { useState } from 'react'
import { firebaseAuth, db } from '../authentication/firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import axios from 'axios'

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState('')

  const sendMessage = async (event) => {
    event.preventDefault()

    if (message.trim() === '') {
      alert('Enter valid message')
      return
    }
    console.log('here')
    axios
      .get('http://localhost:3001/bad-words/' + message)
      .then((response) => {
        console.log(response)
        if (response.data.bad == true) {
          alert('Message contains bad words')
          return
        }
        const { uid, displayName, photoURL } = firebaseAuth.currentUser
        addDoc(collection(db, 'messages'), {
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        }).then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
          setMessage('')
          scroll.current.scrollIntoView({ behavior: 'smooth' })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <form onSubmit={(event) => sendMessage(event)} className='send-message'>
      <label htmlFor='messageInput' hidden>
        Enter Message
      </label>
      <input
        id='messageInput'
        name='messageInput'
        type='text'
        className='form-input__input'
        placeholder='type message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  )
}

export default SendMessage
