import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUserStart } from '../../redux/User/user.actions';

// Types
import { RootState } from '../../types';

const mapState = ({ user }: RootState) => ({
  isLoggedIn: user.isLoggedIn,
  userErr: user.userErr,
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, userErr } = useSelector(mapState);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      resetForm();
      history.push('/');
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUserStart({
        username,
        email,
        password,
        confirmPassword,
      }),
    );
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='card-title'>Registrer</div>

        {errors.length > 0 && (
          <div className='errors'>
            {errors.map((err, key) => {
              return <span key={key}>{err}</span>;
            })}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Brukernavn</label>
            <input
              className='form-control'
              type='text'
              name='username'
              placeholder='Brukernavn'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>E-mail</label>
            <input
              className='form-control'
              type='email'
              name='email'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Passord</label>
            <input
              className='form-control'
              type='password'
              name='password'
              placeholder='Passord'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='confirmPassword'>Gjenta passord</label>
            <input
              className='form-control'
              type='password'
              name='confirmPassword'
              placeholder='Gjenta passord'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className='btn btn-primary' type='submit'>
            Registrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
