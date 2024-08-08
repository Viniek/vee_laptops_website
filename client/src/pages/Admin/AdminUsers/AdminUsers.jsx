import React,{useState,useEffect}from 'react'
import useUserStore from '../../../../store/useUserStore'; 
import axios from 'axios'
import Admin from '../../../../Components/AdminNav/Admin';
import './AdminUsers.css'



function AdminUsers() {
  const[users,setUsers]=useState([])
  const[totalUsers,setTotalUsers]=useState([])
  const [loading, setLoading] =useState(false)
  const user = useUserStore((state)=>state.user)




  useEffect(() => {
    async function getAllUsers(){
    if(user && user.role ==="admin"){
      try {
        setLoading(true)
        const response=await axios.get("http://localhost:4000/users/AllUsers",{withCredentials:true})
console.log(response);
     
        setUsers(response.data.data);
     
      } catch (error) {
        console.error("An error occurred while fetching users...:", error);
          setError("An error occurred while fetching users...");
      }finally{
        setLoading(false);
      } 
   
    }else{
      console.log("unauthorised..");
    }
    }
    getAllUsers();
  }, []);


  return (
    <>
 <h1 className='usersContainer'>Vee users</h1>
  <section className='usersContainer'>
 
{users.map((user)=>(
<div className='users' key={users.id}>
<p>{user.firstName}</p>
<p>{user.lastName}</p>
<p>{user.email }</p>
<p>{user.role }</p>
<p>{user.createdAt}</p>
<p>{user.updatedAt}</p>
</div>

))}


  </section>
    </>
  )
}

export default AdminUsers