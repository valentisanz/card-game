import React, { useState } from 'react';
import './styles/Login.css';
import { Redirect, useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const createUser = async (e) => {
        e.preventDefault()

        if (username.length > 0) {
            fetch(`http://localhost:8080/users/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })

            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        Promise.reject()
                    }
                })
                //save user locally and go to game view
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user))
                    history.push('/game')
                })
                .catch(err => {
                    console.log(err)
                    setMessage('Something went wrong, try again later.')
                })
        } else {
            setMessage('Enter a valid username')
        }
    }
    //if a user is saved locally go to game page
    if (localStorage.getItem('user')) {
        return <Redirect to='/game' />
    }
    return (
        <div className="Login">
            <h1 className='title'>Card Memory Game</h1>
            <p className='subtitle'>Try to match all the pairs making the fewest mistakes.</p>
            <form onSubmit={createUser}>
                <label>
                    <input type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username" />
                </label>
                <button className="red" type="submit">START</button>
            </form>
            <p className='errorMessage'>{message}</p>
        </div>
    );
}
export default Login;
