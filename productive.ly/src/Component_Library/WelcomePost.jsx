import React, { useState } from 'react';
import axios from 'axios'

function WelcomePost(props) {
  const [name, setName] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = {
      name,
    }
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/user`
    await axios.post(
      airtableURL,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        }
      }
    )
    setName('')
    props.setRefresh(!props.refresh)
  }

  return (
    <div className='welcome-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>What is your name? </label>
        <input
          className="name-input"
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  )
}

export default WelcomePost