import React, { useState, useEffect } from "react";
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from "../axios";
import config from "../config";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";


const Profile = () => {
  const { user } = useAuthStore();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [cover, setCover] = useState(null);
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const userData = response.data;
        console.log(userData.photo)
        setUserId(userData._id);
        setName(userData.name);
        setEmail(userData.email);
        setPhoto(userData.photo || "");
        setCover(userData.cover || "");
        setJob(userData.job || "");
        setBio(userData.bio || "");
        setIsFollowing(userData.followers.includes(user._id)); 
        setFollowersCount(userData.followers.length);
        setFollowingCount(userData.following.length);

      } catch (error) {
        // toast.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);



  const followUser = async (userId) => {
    try {
      const response = await axios.post(
        `users/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("followed successfully");
        console.log("User followed successfully");
        setIsFollowing(true); // Update the following status
        setFollowersCount((prevCount) => prevCount + 1); // Increment followers count
      }
    } catch (error) {
      toast.error("Error following user");
      console.error("Error following user", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const response = await axios.post(
        `users/unfollow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Unfollowed");
        console.log("User unfollowed successfully");
        setIsFollowing(false); // Update the following status
        setFollowersCount((prevCount) => prevCount - 1); // Decrement followers count
      }
    } catch (error) {
      console.error("Error unfollowing user", error);
      toast.error("Error Unfollowing");
    }
  };



  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (photo) {
        formData.append("photo", photo);
      }
      if (cover) {
        formData.append("cover", cover);
      }
      formData.append("bio", bio);
      formData.append("job", job);

      console.log(formData);
      const response = await axios.put(`/users/profile/${userId}`, formData, {
       
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Profile updated successfully:");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };


  return (
    <>
      <Breadcrumb pageName="Profile" />

      <form onSubmit={handleUpdateProfile} className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={`${config.API_URL}${cover}`}
           
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only"   onChange={(e) => setCover(e.target.files[0])} />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={`${config.API_URL}${photo}`}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.7"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="photo"
                  id="profile"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  onClick={handleFileClick}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <input className="text-center mb-1.5 text-2xl font-semibold text-black dark:text-white dark:bg-slate-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required>

            </input><br />
            <input className="text-center mb-1.5   text-black dark:text-white dark:bg-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Add your email"
              required>

            </input><br />
            <input className="text-center mb-1.5  text-black dark:text-white dark:bg-slate-700"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder="Add Your Profession"
              required>

            </input>
            <div className="flex justify-center">
              {user &&
                user.email !== email &&
                (!isFollowing ? (
                  <button
                    onClick={() => followUser(userId)}
                    className="bg-blue-600 hover:bg-blue-700 p-1 rounded-md text-white m-2"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => unfollowUser(userId)}
                    className="bg-blue-600 hover:bg-blue-700 p-1 rounded-md text-white m-2"
                  >
                    Following
                  </button>
                ))}

            </div>

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-56 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">

              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {followersCount}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {followingCount}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <textarea className="p-2 mt-4.5  text-black dark:text-white dark:bg-slate-700"
                placeholder="Add Your Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              >

              </textarea>
            </div>
            <div className="flex justify-center mt-3 ">
              <button
                type="submit"
                className="w-36 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Profile
              </button>
            </div>
            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_966)">
                      <path
                        d="M1hd"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_966">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_970)">
                      <path
                        d="Mexample"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_970">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.666138)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_974)">
                      <path
                        d="example"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_974">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.333862)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_978)">
                      <path
                        d="example"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_978">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_30_982)">
                      <path
                        d="example"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_982">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.666138)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
