import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { openModal } from "../../../../store/modalSlice";
const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const modal = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleOpenModal = (id) => {
    dispatch(openModal({ id: id }));
  };

  return (
    <div className="py-5 flex justify-between">
      {profile.username && (
        <div className="flex">
          <div className="profile-details py-2 flex flex-col gap-y-2">
            <h2 className="text-2xl">Welcome, {profile.username}!</h2>
            <h3 className="text-xl">{profile.companyPosition}</h3>
          </div>
          {profile.role && <h3 className="text-xl">{profile.role}</h3>}
        </div>
      )}
      <div className="profile-menu flex flex-col items-center gap-y-2">
        {profile.imgSrc ? (
          <img
            className="block max-h-20 max-w-20 rounded-full bottom-1 border-solid border-black"
            src={profile.imgSrc}
            alt="Profile"
          />
        ) : (
          <i className="block">
            <FontAwesomeIcon className="block h-12 w-auto" icon={faUser} />
          </i>
        )}
        <button
          className="block py-0.5 px-3 rounded-xl bg-blue-400"
          type="button"
          onClick={() => handleOpenModal(3)}
        >
          Edit Profile
        </button>
      </div>
      {modal[3] && <EditProfile />}
    </div>
  );
};
export default Profile;
