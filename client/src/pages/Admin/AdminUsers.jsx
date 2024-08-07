import React,{useState,useEffect}from 'react'
import useUserStore from '../../../store/useUserStore'; 
import axios from 'axios'
import Admin from '../../../Components/AdminNav/Admin';
import '../../../Components/AdminNav/Admin.css'



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
 
  <section className='usersContainer'>
  rvmjjvjciooooobiiejijdjvnjnejuuehuoibit
{users.map((user)=>(
<div key ={users.id} classname='userss'>
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