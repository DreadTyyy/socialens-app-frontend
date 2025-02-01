import React, { ChangeEvent, useState } from "react";

type InputHandle = (defaultValue?: string) => [
    string, 
    (event: React.ChangeEvent<HTMLInputElement>) => void, 
    React.Dispatch<React.SetStateAction<string>>]; 

const useInput: InputHandle = (defaultValue = "") => {
    const [value, setValue] = useState<string>(defaultValue)

    function handleValueChange(event: ChangeEvent<HTMLInputElement>){
        setValue(event.target.value)
    }

    return [value, handleValueChange, setValue,];
}

export default useInput;