import React from 'react';

const Pinfo = () => {
    return (
        <div className="section-container" id="Pinfo">
            <div className="section-main">
                <label htmlFor="fname">First Name:</label><br />
                <input type="text" id="fname" name="fname" required /><br />
                <label htmlFor="sname">Second Name:</label><br />
                <input type="text" id="sname" name="sname" required /><br />
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" required /><br />
                <label htmlFor="phone">Phone:</label><br />
                <input type="tel" id="phone" name="phone" required /><br />
                <label htmlFor="plink">Personal link:</label><br />
                <input type="url" id="plink" name="plink" required /><br />
                <div className="address-container">
                    <label htmlFor="address">Address:</label><br />
                    <input type="text" id="address" name="address" required /><br />
                    <label htmlFor="city">City:</label><br />
                    <input type="text" id="city" name="city" required /><br />
                    <label htmlFor="zip">Zip:</label><br />
                    <input type="text" id="zip" name="zip" required /><br />
                    <label htmlFor="country">Country:</label><br />
                    <input type="text" id="country" name="country" required /><br />
                </div>
            </div>
        </div>
    );
}

export default Pinfo;
