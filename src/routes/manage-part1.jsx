import React, {useState, useEffect, useContext} from 'react';
import {Icon} from '@iconify/react';
import {toast} from "react-toastify";
import {AuthContext} from "./AuthContext.jsx";
import {UnLoginText_Move} from "./login.jsx";


function Form() {
    const {auth,setauth} = useContext(AuthContext);
    const isLoggedIn = auth.loggedIn;
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                toast.success(`匯入成功!`)
                setUploadProgress(0); // Reset progress after successful upload
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    const Logout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('Data:',data);
            if (data.success) {
                document.cookie = "AccID=";
                window.location.href = '/login';
            } else {
                console.error('logout failed');
                alert('登出失敗');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };


    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="p-2 w-2/5  items-center  rounded-lg mx-auto bg-gray-200">
                <div className="flex justify-between">
                    <h1 className="text-3xl p-5 mb-2 font-bold">管理員匯入資料</h1>
                    <button className="w-52 h-1/3 mt-4 hover:bg-red-500 text-black font-bold py-2 border-black border-2 px-4 rounded-full flex items-center justify-center " onClick={Logout}>登出</button>

                </div>
                {!isLoggedIn ? (<UnLoginText_Move/>) : (
                    <div className="border-2 items-center  mx-auto border-gray-400 bg-white  pl-3 pr-3 pt-1 pb-6 mb-4 rounded-lg relative z-10">

                        <div>
                            <div className="text-xl m-4" ><Icon className="mr-4 inline text-xl" height="23" width="23" icon="vscode-icons:file-type-excel" />匯入Excel</div>
                            <input className="flex justify-center items-center" type="file" onChange={handleFileUpload} />
                            {uploadProgress > 0 && (
                                <div>
                                    <progress value={uploadProgress} max="100"></progress>
                                    <span>{uploadProgress}%</span>
                                </div>
                            )}
                        </div>




                    </div>

                )}
            </div>
        </div>
    );
}

export default Form;
