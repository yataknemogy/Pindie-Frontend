'use client';
import { authorize, isResponseOk} from '@/app/api/api-utils';
import Styles from './AuthForm.module.css';
import { useState, useEffect } from 'react';
import { endpoints } from '@/app/api/config';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/app-context';
import { useStore } from '@/app/store/app-store';

export const AuthForm = (props) => {
  const [authData, setAuthData] = useState({ identifier: "", password: "" })
  const [message, setMessage] = useState({ status: null, text: null});
  
  const authContext=useStore();

 const handleInput = (e)=>{
  setAuthData({ ...authData, [e.target.name]: e.target.value });
 };
 const handleSubmit = async (e)=>{
    e.preventDefault();
    const userDataAuth = await authorize(endpoints.auth, authData);
    if(isResponseOk(userDataAuth)){
      authContext.login(userDataAuth.user, userDataAuth.jwt);
      setMessage({ status: "success", text: "Вы авторизовались!" });
    }
    else{
      setMessage({ status: "error", text: "Неверный логин или пароль" });
    }
 }
    useEffect(() =>{
      let timer;
      if(authContext.user){
       timer = setTimeout(() =>{
          props.closePopup();
        },1000)
      }
      return () => clearTimeout(timer)
    },[authContext.user])

    
  return (
    <form  onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input onInput={handleInput} 
          className={Styles['form__field-input']} 
          name="identifier"
          type="email" 
          placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input onInput={handleInput}
           className={Styles['form__field-input']} 
           name="password"
           type="password"
           placeholder='***********'/>
        </label>
      </div>
      {message.status &&
      <p className={Styles['form__message']}>{message.text}</p>
      }
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};