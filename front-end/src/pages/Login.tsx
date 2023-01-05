import React from 'react';
import { useState } from 'react';
import Button from '../components/Button';
type Props = {}
type stateObj ={
    email:string;
    password:string;
}
export default function login({}: Props) {
    const [formData, setFormData] = useState<stateObj>({
        email:"",
        password:""
    });
    function handleChange(e:any):void{
        setFormData(
            {...formData, [e.target.name]:e.target.value}
        );
    }
  return (
    <>
    <section>
        <div>
            <img alt="unsplash logo"/> {/*add an onclick to redirect to home page*/}
            <h1>Login</h1>
            <h3>Welcome back</h3>
        </div>
    <form>
<div>
    <label htmlFor='email'>Email</label>
    <input type={'text'} name='name' onChange={handleChange} id='email'/>
</div>
<div>
    <label htmlFor="password"></label>
    <input type={'text'} name='name' onChange={handleChange} id='password'/>
</div>
<Button>{'Login'}</Button>
    </form>
    </section>
    </>
  )
}