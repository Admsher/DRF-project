import { useState,useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { setProfile, setImgSrc } from "../../../../store/profileSlice";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-hot-toast";
import Modal from "../../../../components/Modal";
import { closeModal } from "../../../../store/modalSlice";
export default function EditProfile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    company: "",
    contactNumber: "",
    position: "",
    companyDetails: "",
    companyDescription: "",
    password: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
  const fetchUserData = async () => {


  // const profile = useSelector((state) => state.profile);

  


    try {
      const token = localStorage.getItem('token'); // Replace with your actual token retrieval method
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get("http://127.0.0.1:8000/auth/get-user-by-token/", {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      console.log(token);
      const userId = response.data.id;
      console.log(response.data.id);
      // Fetch the user's detailed data
      const userResponse = await axios.get(`http://127.0.0.1:8000/auth/user/${userId}/`, {
        headers: {
          // Authorization: `Token ${token}`
        }
      });

      setFormData({
        username: userResponse.data.username || "",
        company: userResponse.data.company || "",
        contactNumber: userResponse.data.contact_number || "",
        position: userResponse.data.position || "",
        companyDetails: userResponse.data.company_details || "",
        companyDescription: userResponse.data.company_description || "",
        password: "", // Do not set password from the backend
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error fetching user data.");
    }
  };

  fetchUserData();
}, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({ ...formData, contactNumber: value || "" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Verify the current password
      const passwordCheckResponse = await axios.post("http://127.0.0.1:8000/auth/verify-password/", {
        password: currentPassword,
      });
      if (passwordCheckResponse.status !== 200) {
        alert("Incorrect current password.");
        return;
      }

      // Update profile information
      const profileResponse = await axios.put("http://127.0.0.1:8000/auth/profile/", {
        username: formData.username,
        company: formData.company,
        contact_number: formData.contactNumber,
        position: formData.position,
        company_details: formData.companyDetails,
        company_description: formData.companyDescription,
      });
      if (profileResponse.status === 200) {
        // dispatch(setProfile(formData));
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }

      // Upload profile picture
      if (selectedFile) {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("profile_picture", selectedFile);
        const uploadResponse = await axios.put("http://127.0.0.1:8000/auth/profile-picture/", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (uploadResponse.status === 200) {
          alert("Profile picture uploaded successfully!");
          const imgSrc = URL.createObjectURL(selectedFile);
        //   dispatch(setImgSrc(imgSrc));
        } else {
          alert("Failed to upload profile picture.");
        }
      }


    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }


  };
   
   const handleCloseModal = (id) => {
    dispatch(closeModal({ id }));
  };
  

  return (
    <div className="fixed inset-0 z-50 px-5 w-dvw grid place-items-center">
      <Modal onClose={() => handleCloseModal(3)}>
        <div className="flex flex-col justify-center">
          <h2 className="underline text-3xl mb-6 text-center text-white">
            Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-text">
              <div className="flex md:flex-row flex-col">
                <div className="top-sec block w-full md:mr-4">
                  <label htmlFor="username" className="block text-white">
                    User Name*
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="block rounded-3xl bg-white max-w-full md:max-w-[365px] px-4 py-2 w-full"
                  />
                  <label htmlFor="currentPassword" className="block text-white">
                    Current Password*
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="block rounded-3xl bg-white max-w-full md:max-w-[365px] px-4 py-2 w-full"
                  />
                  <label htmlFor="password" className="block text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="block rounded-3xl bg-white max-w-full md:max-w-[365px] px-4 py-2 w-full"
                  />
                  <label htmlFor="email" className="block text-white">
                    Email address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-mail address"
                    className="block rounded-3xl px-4 py-2 bg-white max-w-full md:max-w-[365px] w-full"
                  />
                </div>
                <div className="mt-6 bg-white rounded-3xl md:p-1 p-4 max-w-fit mx-auto md:mx-0">
                  <label
                    htmlFor="profileImage"
                    className="block text-xl mb-2 font-bold text-black text-center"
                  >
                    Upload Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="profileImage"
                    onChange={handleFileChange}
                    className="block text-sm md:mx-0 mx-auto text-gray-900 mb-2 border rounded-sm cursor-pointer bg-gray-300 focus:outline-none"
                  />
                  {preview && (
                    <div>
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="block mb-4 max-h-32 max-w-32 rounded-md object-cover mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="bot-sec flex flex-col">
                <label htmlFor="contactNumber" className="text-white">
                  Contact Number*
                </label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="CH"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Contact number"
                  className="rounded-3xl bg-white selection:outline-none flex px-4 py-2 w-full md:max-w-[400px] max-w-full"
                />
                <label htmlFor="company" className="text-white">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="block rounded-3xl bg-white px-4 py-2 w-full md:max-w-[460px] max-w-full"
                />
                <label htmlFor="companyPosition" className="text-white">
                  Company position*
                </label>
                <input
                  type="text"
                  id="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Company position"
                  className="block rounded-3xl px-4 py-2 w-full bg-white md:max-w-[520px] max-w-full"
                />
                <label htmlFor="companyDetails" className="text-white">
                  Company details*
                </label>
                <input
                  type="text"
                  id="companyDetails"
                  placeholder="Company details"
                  value={formData.companyDetails}
                  onChange={handleInputChange}
                  className="block rounded-3xl px-4 py-2 w-full bg-white md:max-w-[580px] max-w-full"
                />
                <label htmlFor="companyDescription" className="text-white">
                  Company description*
                </label>
                <textarea
                  placeholder="Company description"
                  id="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  cols={30}
                  rows={5}
                  className="block rounded-xl px-2 py-1 bg-white resize-none"
                />
                <button
                  type="submit"
                  className="md:max-w-fit max-w-full w-full mx-auto px-12 py-2 mt-8 bg-[#243E71] text-white font-semibold rounded-3xl hover:bg-black focus:outline-none transition-all duration-300 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
