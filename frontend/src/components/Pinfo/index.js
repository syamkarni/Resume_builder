import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pinfo = () => {
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState({
        fname: '',
        sname: '',
        email: '',
        phone: '',
        plink: '',
        github: '',
        linkedin: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const savePersonalInfo = async () => {
        const response = await fetch('http://127.0.0.1:5000/save_personal_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personalInfo),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div className="section-container" id="Pinfo">
            <div className="section-main">
                <label htmlFor="fname">First Name:</label><br />
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={personalInfo.fname}
                    onChange={handleInputChange}
                    required
                /><br />

                <label htmlFor="sname">Second Name:</label><br />
                <input
                    type="text"
                    id="sname"
                    name="sname"
                    value={personalInfo.sname}
                    onChange={handleInputChange}
                    required
                /><br />

                <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                    required
                /><br />

                <label htmlFor="phone">Phone:</label><br />
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleInputChange}
                    required
                /><br />

                <label htmlFor="plink">Personal Link:</label><br />
                <input
                    type="url"
                    id="plink"
                    name="plink"
                    value={personalInfo.plink}
                    onChange={handleInputChange}
                    required
                /><br />

                <label htmlFor="github">GitHub URL:</label><br />
                <input
                    type="url"
                    id="github"
                    name="github"
                    value={personalInfo.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                /><br />

                <label htmlFor="linkedin">LinkedIn URL:</label><br />
                <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={personalInfo.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://www.linkedin.com/in/yourprofile"
                /><br />

                <div className="address-container">
                    <label htmlFor="address">Address:</label><br />
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="city">City:</label><br />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={personalInfo.city}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="zip">Zip:</label><br />
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={personalInfo.zip}
                        onChange={handleInputChange}
                        required
                    /><br />

                    <label htmlFor="country">Country:</label><br />
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={personalInfo.country}
                        onChange={handleInputChange}
                        required
                    /><br />
                </div>
            </div>
            <button onClick={() => navigate('/Description')}>Back</button>
            <button onClick={() => {
                savePersonalInfo();
                navigate('/Work');
            }}>Next</button>
        </div>
    );
};

export default Pinfo;
