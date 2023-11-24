import { useState } from "react"


const useInput = (validationHandler) => {

    const [data, setData] = useState('');
    const [error, setError] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    function textChangeHandler(e) {
        setData(e.target.value)
        setIsTouched(true);
        setError(!validationHandler(data))
    }

    function blurHandler() {
        setIsTouched(true);
        setError(!(data && validationHandler(data)));
    }


    return {
        data,
        actionError: error && isTouched,
        error: error,
        blurHandler,
        textChangeHandler
    }

}

export default useInput;