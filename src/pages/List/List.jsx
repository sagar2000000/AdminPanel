import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
function List({url}) {
 

    const fetchList=async ()=>{
      const response=await axios.get(`${url}/api/food/list`)
      console.log(response.data)
      console.log(response.data.data)
      if(response.data.Sucess){
        setList(response.data.data)
        console.log("hello i a, set")
      }
      else{
        toast.error("Error")
      }
    }


    const removeFood=async (foodId)=>{
      console.log(foodId)

     
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId}) 
    await fetchList()
    if(response.data.Sucess){
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
    
    }
   
        
                                   


   
    useEffect(()=>{
fetchList()
    },[])
  
  return (
    <div className='list add flex col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>रु{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List