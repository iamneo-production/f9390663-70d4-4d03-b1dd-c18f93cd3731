import React, { useState,useEffect,useRef } from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom"
import { FaUser,FaHome,FaBars,FaInstagram,FaTwitter,FaYoutube,FaFacebook,FaLinkedin, FaPlusCircle,FaMinusCircle} from 'react-icons/fa';
import {useDispatch,useSelector} from 'react-redux';
import NewPlaylist from './NewPlayList';
import Playlist1 from '../Playlist1';
import Postplay from './Crud/Postplay';

import axios from 'axios';
import Feedback from './Feedback/Feedback';


const Sidebar = () => {

   // display home and playlist content
    const[open,setOpen]=useState(false);
    const[home,setHome]=useState(false);
    const handleOpenPlaylist = (e) => {
      setOpen(true);
      setHome(false);
      
    }; 
    const handleOpenHome = (e) => {
      setHome(true);
      setOpen(false);
    };
    
  
    // user profile in navbar
    const[openuser,setOpenUser]=useState(false);

    let menuRef = useRef();
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpenUser(false);
          console.log(menuRef.current);
        }      
      };
      document.addEventListener("mousedown", handler);
    });


    // popupdialog box to create playlist
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenPopup = () => {
      setIsOpen(true);
    };
    const handleClosePopup = () => {
      setIsOpen(false);
    };
    // popupdialog box to delete playlist
    const [isDelete, setIsDelete] = useState(false);
    const handleOpenDelete = () => {
      setIsDelete(true);
    };
    const handleCloseDelete = () => {
      setIsDelete(false);
    };

    // playlist
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const handleCreatePlaylist = () => {
    if (playlistName.trim() !== '') {
      const newPlaylist = { name: playlistName };
      setPlaylists([...playlists, newPlaylist]);
      setPlaylistName('');
    }
    };
    const handlePlaylistNameChange = (event) => {
      setPlaylistName(event.target.value);
    };               
                  
    // redux
    const counter=useSelector((state)=>state.counter);
    const increment =()=>{
      dispatch({type:"INC"})
    }
    const dispatch=useDispatch();      

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8081/api/v1/users/getplay')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const[getData,setGetData]=useState([]);
    useEffect ( () => {
      apiFetch();
    },[]);
  
    let apiFetch = async () => {
      let res=await axios.get("http://localhost:8081/api/v1/users/getplay");
      setGetData(res.getDatadata.data);
    };

   
    const [id,setId]=useState("");
    const deleteplayid=(evt)=>{
            axios.delete(`http://localhost:8081/api/v1/users/deleteplay/${id}`)
            .then( alert("Deleted Playlist"))
            .catch(err=>console.log(err))
    }
   
  

return (
  <div className=''>
  
  {/* navigation bar */}
    <div className='nav'>
      <nav className='menu'>
        <div className='leftnav'>
            <FaHome style={{color:'white',margin:'12px 5px 10px 30px'}} onClick={handleOpenHome} size={35}/>
        </div>
        <div className='searchbar'> 
            <input type="text" placeholder="Search here" style={{padding:'10px 10px 10px 30px',width:'50%'}} onChange={''} className='search' value={''}  />
           
        </div>
        <h2 style={{color:'white',padding:'0 450px 0 0'}}>MUCIFY</h2>

        {/* user profile */}
        <div className='rightnav'>    
        <div className="profile">
        </div>
        <div className='menu-container' ref={menuRef}>
        <div className='' onClick={()=>{setOpenUser(!openuser)}}>
           <FaUser style={{color:'white',padding:" 9px 50px 4px 20px"}}  size={25}/>
        </div>
        {/* user profile sub contents */}
        <div className={`dropdown-menu ${openuser? 'active' : 'inactive'}`} >
          <ul>
            <Link to="Profile"><DropdownItem  text = {"Profile"}/></Link>
            <Link to="Feedback"><DropdownItem  text = {"Feedback"}/></Link>
            <Link to="Signin"><DropdownItem  text = {"Logout"}/></Link>
          </ul>
        </div>
      </div>

        </div>
    </nav>
  </div>

    {/* sidebar contents */}
    <div className='sidebarsection'>
      <div className="homepage">
        {/* left side section */}
        <div className="leftsection">
          <div>
            <button className='head3'> <div className='head1'><FaBars size={16} />  PlayList
            {/* {data.map((data, counter) => (
              
                          <ul key={data}>  {counter+1} </ul>

            ))} */}
              </div>  <div className='circle'>  <FaPlusCircle size={45} onClickCapture={increment} onClick={handleOpenPopup} className='head2'/><FaMinusCircle size={45} onClick={handleOpenDelete} className='head2'/> </div></button>
          </div>

          {/* list of playlists */}
          <div>
            {/* <div className='playlist'>
               <div className='ullist'>
                  {playlists.length === 0 ? (
                      <p style={{padding:'10px',marginLeft:'10px'}}>No playlists created yet</p>
                  ) : (
                      <ul className='newlists'>
                          {playlists.map((playlist, counter) => (
                          <li key={counter}><button  className='playbutton'  onClick={handleOpenPlaylist} >{counter+1} {playlist.name}</button></li>
                        ))}
                      </ul>
                  )}
                </div>
              </div> */}
                <table id="songs" border={1}>
        <thead>
          <tr>
           
          </tr>
        </thead>
        {data.map((play) => {
          return (
            <>
            
              <tbody>
                <tr onClick={handleOpenPlaylist} key={play.id}>
                  <td>{play.id}</td>
                  <td>{play.name}</td>
                 
                </tr>
              </tbody>
            </>
          );
        })}
        
        </table>
            </div>
          <div>
        </div>
      </div>


      {/* right section of home page */}
        <div className="rightsection">
            {!open && !home &&
             <div className='homebg'></div> 
              // <div className='songdb'>      
              //   <ul>
              //     {songs.map(song => (
              //     <li key={song.songid}>
              //       <a href={song.songurl} target="_blank" rel="noopener noreferrer">
              //       {song.songname}
              //       </a>
              //     </li>
              //     ))}
              //   </ul>
              // </div>
             }
         
            {open &&
             <Playlist1 />
            }
 
            {home &&
              <NewPlaylist />
            }
          
            {/* popup container to create new list */}
            {isOpen && 
            (<div className="popup-container">
                <div className="popup-content">
                  <h4>PlayList Name</h4>
                    {/* <form className='formpop'>
                      <input type="text" value={playlistName} onChange={handlePlaylistNameChange} /><br />
                    </form> */}
                <Postplay />
                
                        {/* <button type="button" onClick={handleCreatePlaylist} onClickCapture={increment}>Create</button> */}
                      {/* <button className="closebutton" onClick={handleClosePopup}>Close</button>  */}
                </div>
              </div>
            )
          
            }
            {isDelete &&
                 (<div className="popup-container">
                 <div className="popup-content">
                 <input type="text" className='inputdelete' placeholder='PlaylistId' value={id} onChange={e=>setId(e.target.value)} />
                      <div className='delbutton'>
                      <button className="" onClick={deleteplayid}>Delete</button>
                       <button className="" onClick={handleCloseDelete}>Close</button> </div>
                 </div>
               </div>
             )
            }
          </div>
        </div>

    </div>

    
      
        {/* footer in home page */}
        
        <div className='homefoot'>
                <a href="https://www.instagram.com/"><FaInstagram size={20} /></a>
                <a href="https://twitter.com/"><FaTwitter size={20} /></a>
                <a href="https://www.linkedin.com/"><FaLinkedin size={20} /></a>
                <a href="https://www.facebook.com/"> <FaFacebook size={20} /></a>
                <a href="https://www.youtube.com/"> <FaYoutube size={20}/></a>
                <h6>© 2023 Copyright: Mucify.com</h6>
          </div>
      
</div>
  );
};
export default Sidebar;

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      {/* <img src={props.img} alt='propimg'></img> */}
      <p> {props.text} </p>
    </li>
  );
}

