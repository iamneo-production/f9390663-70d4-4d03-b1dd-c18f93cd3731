// import React from 'react'
// import Sidebar from './Sidebar';
// import { useSelector } from 'react-redux';
// function Profile() {
//     const user = useSelector((state) => state.user);
//   return (
//     <div>
//         <h1> <div className="user-profile-page">
//       <h2>User Profile</h2>
//       {user && (
//         <div>
//           <img src={user.picture} alt='' />
//           <h3>{user.name}</h3>
//           <h3>{user.email}</h3>
//         </div>
//       )}
    
//     </div></h1>
//     </div>
//   )
// }

// export default Profile

import React from 'react';
import { connect } from 'react-redux';

const UserProfilePage = ({ user }) => {
  return (
    <div className="user-profile-page">
      <h2>User Profile</h2>
      {user && (
        <div>
          <img src={user.picture} alt='' />
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </div>
      )}
      {/* ... Other content ... */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(UserProfilePage);
