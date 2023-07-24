import React, { useState,useEffect,useRef } from 'react';
import './Playlist1.css';
import {FaEllipsisV, FaPlay, FaSpotify,FaHeart} from 'react-icons/fa';
import {Link} from "react-router-dom"
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import Post from './Components/Crud/Post';

const Playlist1 = () => {
  
  //open edit menu
  const[openedit,setOpenEdit]=useState(false);
  let editRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!editRef.current.contains(e.target)){
        setOpenEdit(false);
        console.log(editRef.current);
      }      
    };
    document.addEventListener("mousedown", handler);
  });


  //axios

  const[addData,setAddData]=useState({});
  const[editData,setEditData]=useState({});
  
  const[getData,setGetData]=useState([]);
  useEffect ( () => {
    apiFetch();
  },[]);

  let apiFetch = async () => {
    let res=await axios.get("http://localhost:8080/getsong");
    setGetData(res.getDatadata.data);
  };

  // let deleteapi = async (songid) => {
  //   let res=await axios.delete(`http://localhost:8080/deletesong/${songid}`);
  //   apiFetch();
  //   if(res.data.error){
  //     alert(res.data.error);
  //   }
  //   else{
  //     alert(res.data.message);
  //   }
  // };

  // let addapi = async () => {
  //   let res = await axios.post("http://localhost:8080/postsong",addData);
  //   if(res.data.error){
  //     alert(res.data.error);
  //   }
  //   else{
  //     alert(res.data.message);
  //   }
  //   apiFetch();
  // };

  // let editapi = async () => {
  //   let res = await axios.put("http://localhost:8080/putsong",editData);
  //   if(res.data.error){
  //     alert(res.data.error);
  //   }
  //   else{
  //     alert(res.data.message);
  //   }
  //   apiFetch();
  // };

  //getapi

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getsong')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const postRequest = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while making the POST request.');
    }
  };

  const putRequest = async (url, data) => {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while making the PUT request.');
    }
  };
  const deleteRequest = async (url) => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while making the DELETE request.');
    }
  };
    
  const handleAdd = () => {
    postRequest('http://localhost:8080/postsong', addData)
      .then((data) => {
        alert(data.message);
        apiFetch();
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  const handleEdit = () => {
    putRequest('http://localhost:8080/putsong', editData)
      .then((data) => {
        alert(data.message);
        apiFetch();
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  const handleDelete = (songid) => {
    deleteRequest(`http://localhost:8080/deleteplay/${songid}`)
      .then((data) => {
        alert(data.message);
        apiFetch();
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  const [showAdd, setShowAdd] = useState(false);

  // const handleOpenAdd = () => {
  //   setShowAdd(true);
  // };

  // const handleCloseAdd = () => {
  //   setShowAdd(false);
  // };
  // const [showModal, setShowModal] = useState(false);
  const handleOpenAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const counter=useSelector((state)=>state.counter);
  const increment =()=>{
    dispatch({type:"INC"})
  }
  const dispatch=useDispatch();      
  return (
   
    <div className="body">

        <div className='listname'>
          <h2 style={{margin:"0px",padding:"40px 0 0 20px",alignItems:"center"}}><FaSpotify /> My Playlist</h2>
        </div>

        <div className='playmus'>
          <div ref={editRef} className='' onClick={()=>{setOpenEdit(!openedit)}}>
            <FaPlay onClick={"handleOverlay"} size={20} style={{color:"black",padding:'5px'}} />&nbsp;
            <FaEllipsisV style={{color:'black',padding:" 9px 50px 4px 20px"}}  size={25}/>
            {/* <h6>Like{counter+1}</h6> */}
          </div>
          <div className='add'>
            <button onClick={handleOpenAdd} className="addbutton" >Add</button>
          <Link to="Put"><button className="addbutton" >Edit</button></Link>
          <Link to="Delete"><button className="addbutton">Delete</button></Link>
          </div>
        </div>

        <div className={`edit-menu ${openedit? 'active' : 'inactive'}`} >
          <button className="editbutton" onClick={() =>'' }>Share</button>
         
        </div>
       
        {/* {showAdd && <Post onClose={handleCloseAdd} />} */}

        {showAdd && (
        <div className="modal-container">
          <div className="modal-content">
            <Post />
           <button className="close-button" onClick={handleCloseAdd}>Close</button>
          </div>
        </div>
      )}
         <div>
            {/* <div className='song2'>
              <span>SNo</span>
              <span>Song</span>
              <span>Album</span>
              <span>Artist</span>
              <span>Duration</span>
            </div> */}
            <div>
            {/* <table id="songs" border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Options</th>
             
            </tr>
          </thead>
          <tbody> */}
          <table id="songs" border={1}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th></th>
            {/* <th scope="col">Url</th>
            <th scope="col">Delete</th> */}
          </tr>
        </thead>
        {data.map((play) => {
          return (
            <>
            
              <tbody>
                <tr key={play.songid}>
                  <td>{play.songid}</td>
                  <td>{play.songname}</td>
                  <td onClickCapture={increment}><FaHeart />{counter}</td>
                  {/* <td>{play.songurl}</td> */}
                
                  {/* <td>
                 
                    <Link to="Delete">
                      <button className="editbutton">Delete</button>
                    </Link>
                  </td>
                  <td>
                 
                    <Link to="Put">
                      <button className="editbutton">Edit</button>
                    </Link>
                  </td> */}
                  {/* <td>
                  <div ref={editRef} className='' onClick={()=>{setOpenEdit(!openedit)}}>
                  <FaEllipsisV style={{color:'black',padding:" 9px 50px 4px 20px"}}  size={25}/></div>
                  
                  </td> */}
                </tr>
              </tbody>
            </>
          );
        })}
        
        </table>
            </div>
            <div>
             
              </div>

           
          {/* <button addapi={addapi} addData={addData} setAddData={setAddData}>Add</button>
          <button apiFetch={apiFetch}>Fetch</button> */}
            {/* <div className='song1'  draggable="true" >
              <div className=''>
                <span>1</span>
              </div>

              <div className=''>
                <span><FaMusic />Song 1</span>
              </div>

              <div className=''>
                <span>Album 1</span>
              </div>
              
              <div className=''>
                <span>Artist 1</span>
              </div>

              <div className=''>
                <span>2:20</span>
              </div>
            </div> */}
          </div>


{/* 
          <div className="music-player">
            <audio controls loop >
              <source src="https://gaana.com/song/ranjha-from-shershaah" type="audio/mp3" />
            </audio>
          </div> */}
      </div> 
      );
    };
export default Playlist1;

function EditItem(props){
  return(
    <li className = 'editItem'>
        <p> {props.text} </p>
    </li>
  );
}