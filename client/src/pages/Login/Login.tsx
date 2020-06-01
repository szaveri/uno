import React from 'react';
import { useForm } from 'react-hook-form';

import { createGame } from '@modules/Player/Player';

// import './Login.less';

export default function Login() {

  const { register, handleSubmit, watch, errors } = useForm();
  const create = (data: any) => {
    createGame(data);
  };

  return (
    <div id="Login">
      <form onSubmit={handleSubmit(create)}>
        <input name="name" defaultValue="" ref={register({ required: true, minLength: 1, maxLength: 20, pattern: /^[A-Za-z0-9]+$/i })} />
        <input name="gameName" ref={register({ required: true, minLength: 1, maxLength: 20, pattern: /^[A-Za-z0-9]+$/i })} />
        <input name="gamePassword" type="password" ref={register} />
        <select name="maxPlayers" ref={register}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
