import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Profile = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userData, setUserData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [image, setImage] = useState(null);

    const { backendUrl, token } = useContext(ShopContext);
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
                    headers: { token },
                });
                console.log(data)
                if (data.success) setUserData(data.userData);
            } catch (error) {
                toast.error(error.message);
            }
        };
        if (token) getUser();
    }, [token, backendUrl]);

    // Handle password form submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }
        try {
            const payload = userData.providers.includes("email") ? { oldPassword, newPassword } : { newPassword };
            const { data } = await axios.post(`${backendUrl}/api/user/set-password`, payload, { headers: { token } })
            if (data.success) {
                toast.success(data.message);
                setOldPassword("");
                setNewPassword("");
                setIsEdit(false);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/update-profile-image`, formData, {
                headers: {
                    token,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (data.success) {
                toast.success("Profile image updated!");
                setUserData({ ...userData, picture: data.picture });
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update image");
        }
    };

    if (!userData) return <p className="text-center mt-10">Loading...</p>;
    const hasEmailProvider = userData.providers.includes("email");

    return (
        <div className="">
            <div className="max-w-lg md:min-h-96 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="Profile Pic"
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
                        />
                    </div>
                    <h2 className="text-xl font-bold">Hi... {userData.name}</h2>
                    <p className="text-gray-600">Email: {userData.email}</p>
                </div>

                <div className="mt-16 my-4">
                    <p className="my-2 text-center text-gray-600">⚠️ Update Password if you have logged in first time by google</p>
                    <h3 className="text-lg font-semibold mb-2">Password</h3>

                    {!isEdit && hasEmailProvider ? (<div className="flex items-center gap-3">
                        <div className="relative w-full">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value="••••••••"
                                readOnly
                                className="p-2 border rounded-md w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2 top-2 text-gray-600 text-xl"
                            >
                                {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsEdit(true)}
                            className="bg-black rounded-2xl cursor-pointer text-white font-light px-8 py-2 "
                        >
                            Edit
                        </button>
                    </div>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
                            {hasEmailProvider && (
                                <div className="relative">
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-2 top-2 text-gray-600 text-xl"
                                    >
                                        {showOldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </button>
                                </div>
                            )}
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 top-2 text-gray-600 text-xl"
                                >
                                    {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </button>
                            </div>

                            <div className="flex justify-around gap-2">
                                <button
                                    type="submit"
                                    className="bg-black rounded-2xl cursor-pointer text-white font-light px-8 py-2 mt-4"
                                >
                                    {hasEmailProvider ? "Update Password" : "Set Password"}
                                </button>
                                {hasEmailProvider && (
                                    <button
                                        type="button"
                                        onClick={() => setIsEdit(false)}
                                        className=" rounded-2xl cursor-pointer bg-gray-200 hover:bg-gray-300 font-light px-8 py-2 mt-4"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
