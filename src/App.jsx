import React, { useReducer, useState } from 'react'
import './style.css'
import { MdDelete } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import Particless from './Particles';
const App = () => {

  const [inputs,setInputs]=useState({
    name:'',
    number:'',
    email:'',
    message:'',
  });
  const initially={
    data:[],
    error:false,
    success:false,
    message:'',

  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  const AddData=()=>{
    if (inputs.name ===''||inputs.number ===''||inputs.email ===''||inputs.message ==='') {
      toast.error('All Fields are Required.')
    }
    else{
      const newItem={...inputs,id:Date.now()}
    dispatch({type:'ADD_DATA',payload:newItem});
    setInputs({name:'',number:'',email:'',message:''});
    toast.success('Data Added Successfully.')
    }
    
    
  }
  const DeleteData=(id)=>{
    dispatch({type:'DELETE_DATA',payload:id});
    toast.error('Data Deleted.')
  }
  const DeleteAll=()=>{
    if (state.data.length==0) {
      toast('No Entry to Delete.')
    } else {
      dispatch({type:'DELETE_ALL'});
    toast.error('All Data Deleted.')
    }
    
  }
  const reducer=(state,action)=>{
      switch(action.type){
        case 'ADD_DATA':

          return { ...state, data: [...state.data, action.payload] };
          
        case 'SET_ERROR':
          return {...state,error:true,message:action.payload}
        case 'SET_SUCCESS':
          return {...state,success:true,message:action.payload}
        
        case 'DELETE_DATA':
          return {...state,data:state.data.filter(item=>item.id!==action.payload)}
          case 'DELETE_ALL':
            return {...state,data:state.data.filter(item=>item.id==-12)}
        default:
          
      }
  }
  const [state,dispatch]=useReducer(reducer,initially);
  return (
    
    <>
      <div className="container mt-4">
        <div className="col-lg-5 mx-auto">
          <h1 className="text-center text-white">useReducer</h1>
          <form className='mt-3 border rounded shadow bg-white p-4'>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input name='name' value={inputs.name}
              onChange={handleChange
              }
              placeholder='Hassan Zaheer' type="text" className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input name='email' value={inputs.email}
              onChange={handleChange
              } placeholder='hassan.zaheer.abbasi@gmail.com' type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input name='number' value={inputs.number}
              onChange={handleChange
              } placeholder='0312-0572561' type="number" className="form-control" id="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea name='message' value={inputs.message}
              onChange={handleChange
              } placeholder='I am a Full Stack Web Developer ....' className="form-control" id="message" rows="3"></textarea>
            </div>
            <button onClick={AddData} className='btn btn-primary w-100 my-3' type="button">Add Data</button>
          </form>
          
        </div>
        <div className="row mt-4">
          {state.data.map(data =>{
            return(
              <div key={data.id} className='col-lg-4 col-md-6 col-sm-12'>
                <div className='card shadow mb-3'>
                  <div className='card-body' style={{
                    position:'relative'
                  }}>
                    <h5 className='card-title'>{data.name}</h5>
                    <p className='card-text'>Email: {data.email}</p>
                    <p className='card-text'>Phone: {data.number}</p>
                    <p className='card-text'>Message: {data.message}</p>
                    
                    <MdDelete  cursor={'pointer'} style={{
                      position: 'absolute',
                      top:'10px',
                      right:'10px'
                    }} color='#D43343' size={32} onClick={()=>DeleteData(data.id)} />

                    
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="col-lg-5 mx-auto">
        <button onClick={DeleteAll} className='btn btn-danger w-100 mb-3' type="button">Delete All</button>
        </div>
        
      </div>
      <Toaster />
      <Particless />
    </>
  )
}

export default App
