import {empty, noSymbol, emailCheck, lengthCheck, passwords} from "../validations";

export const HandleInputChange = (e, setState, setError) => {
    const { name, value } = e.target;

    if(empty(value)){
        setError((prevState) => ({
            ...prevState,
            [name]: "Field cannot be empty."
        }))
    }else{
        setError((prevState) => ({
            ...prevState,
            [name]: ""
        }))
    }


    if(name === "name"){
        if(noSymbol(value)){
            setError((prevState) => ({
                ...prevState,
                [name]: "Invalid username"
            }))
        }else if(lengthCheck(value)){
            setError((prevState) => ({
                ...prevState,
                [name]: "Username too short"
            }))
        }else{
            setError((prevState) => ({
                ...prevState,
                [name]: ""
            }))
        }
    }

    if(name === "email"){
        if(emailCheck(value)){
            setError((prevState) => ({
                ...prevState,
                [name]: "Invalid email"
            }))
        }else{
            setError((prevState) => ({
                ...prevState,
                [name]: ""
            }))
        }
    }





    setState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
}