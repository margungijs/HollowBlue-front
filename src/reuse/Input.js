import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Input = ({label, type, onChange, value, error, name}) => {
    const [focused, setFocused] = useState(false);

    console.log(error)

    return (
        <div className={`input-container flex flex-col relative w-4/5 m-2 mb-4`}>
            <input
                type = {label === "Password" || label === "Confirm password" ? "password" : "text"}
                placeholder = {label}
                className={`w-full px-4 py-2 border-[1px] ${focused ? `border-white` : 'border-neutral-300'} text-black placeholder-black outline-none rounded-xl shadow-md text-lg transition duration-300 font-medium indent-[1px] bg-transparent`}
                onFocus={() => setFocused(true)}
                onBlur={(e) => setFocused(e.target.value.trim() !== '')}
                value={value}
                onChange = {onChange}
                name = {name}
            />
            {type === "1" ?
                ""
                :
                <div className="absolute right-5 top-0 bottom-0 flex items-center">
                    {label === "Username" ? <FaUser /> : <FaLock />}
                </div>
            }
            {error && <p>{error}</p>}
        </div>
    );
}

export default Input;
