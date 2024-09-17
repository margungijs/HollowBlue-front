import React, { useState } from 'react';
import Gojo from "../images/Gojo1.jpeg";
import Background1 from "../images/Background1.jpeg"
import Background4 from "../images/Background4.jpeg"
import Background5 from "../images/Background5.jpeg"
import SendImage from "../reuse/SendData";

const Profile = ( {data} ) => {
    const [selectedImage, setSelectedImage] = useState(Gojo);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }

        const userId = localStorage.getItem('id');
        const url = `http://localhost/api/v1/Image/${userId}`;

        const formData = new FormData;
        formData.append('image', selectedImage);

        console.log(formData)

        SendImage(formData, url)
            .then(response => {
                console.log('Data sent successfully:', response);
            })
            .catch(error => {
                console.error('Error sending data:', error.message);
            });
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg lg:w-3/5 w-full items-center h-full p-10 overflow-hidden ">
            <h1 className="lg:text-5xl text-3xl mb-6 text-center">Your profile.</h1>
            <label htmlFor="imageInput" className="rounded-full relative h-fit mb-6 cursor-pointer">
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <img src={selectedImage} alt="" className="rounded-full lg:h-60 lg:w-60 h-40 w-40 shadow-lg" />
                <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-full">
                    <span className="text-white text-3xl text-center">Change picture</span>
                </div>
            </label>
            <h1 className="text-3xl">{data.name}</h1>
            <div className="flex flex-col h-full w-full">
                <h1 className='text-4xl text-center'>Themes</h1>
                <div className="flex-grow bg-neutral-100 rounded-lg p-4 flex flex-row grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
                    <div className = "bg-white rounded-lg flex justify-center items-center relative cursor-pointer">
                        <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                            <span className="text-white lg:text-3xl text-xl text-center">Choose Default</span>
                        </div>
                    </div>
                    <div className = "bg-white rounded-lg flex justify-center items-center relative cursor-pointer" style={{ backgroundImage: `url(${Background5})`, backgroundSize: 'cover'}}>
                        <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                            <span className="text-white lg:text-3xl text-xl text-center">Choose Battle</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg flex justify-center items-center relative cursor-pointer" style={{ backgroundImage: `url(${Background1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                            <span className="text-white lg:text-3xl text-xl text-center">Choose Six-Eyes</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg flex justify-center items-center relative cursor-pointer" style={{ backgroundImage: `url(${Background4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                            <span className="text-white lg:text-3xl text-xl text-center">Choose Hollow Purple</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
