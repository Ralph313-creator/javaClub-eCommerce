import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getUserDetails, updateUserProfile} from '../action/userAction';
import Loader from '../components/Loader';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user} = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  let {success} = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not Match');
    } else {
      dispatch(updateUserProfile({id: user._id, name, email, password}));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="grid grid-cols-3 w-[70rem] gap-4 mx-auto my-10">
        <div className="relative">
          {error && (
            <div className="flex absolute justify-center w-full">
              <div className="bg-[#d82f424a] text-red p-2 text-center max-w-[25rem] font-sans rounded mb-4">
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className="flex absolute justify-center w-full">
              <div className="bg-[#4bd82f4a] text-red p-2 text-center max-w-[25rem] font-sans rounded mb-4">
                Profile Updated
              </div>
            </div>
          )}
          {message && (
            <div className="flex absolute justify-center w-full">
              <div className="bg-[#d82f424a] text-red p-2 text-center max-w-[25rem] font-sans rounded mb-4">
                {message}
              </div>
            </div>
          )}

          <form
            onSubmit={submitHandler}
            className="max-w-[400px] w-full h-full bg-white shadow-lg p-4 rounded-md"
          >
            <h2 className=" text-6xl font-bold text-center py-8 capitalize">
              Hi! {user.name}
            </h2>

            <div className="flex flex-col py-2 font-sans">
              <label>Name</label>
              <input
                required
                className="border p-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col py-2 font-sans">
              <label>Email Address</label>
              <input
                required
                className="border p-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex. email@gmail.com"
              />
            </div>

            <div className="flex flex-col py-2 font-sans">
              <label>Password</label>
              <input
                required
                className="border p-2 font-sans"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter you Password here"
              />
            </div>

            <div className="flex flex-col py-2 font-sans">
              <label>Confirm Password</label>
              <input
                required
                className="border p-2 font-sans"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm you Password here"
              />
            </div>

            <button
              type="submit"
              className="font-sans border w-full my-5 py-2 btn-black text-white"
            >
              Update
            </button>
          </form>
        </div>

        <div className=" bg-slate-300 col-span-2 flex flex-col items-center rounded-md shadow-md">
          <h2 className="text-3xl font-sans">My Orders</h2>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
