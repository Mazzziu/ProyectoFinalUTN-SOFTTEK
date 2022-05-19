import { useState } from "react";

const useValidateForm = () => {
    const [formValid, setFormValid] = useState(true);
    const [inputValid, setInputValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

    const isValidInput = (value, validators) => {
        if (Object.keys(validators).length > 0) {
            validators.map((validator) => {
                switch (validators) {
                    case "required":
                        if (value === "") setInputValid(false);
                }
            });
        }
    };

    const isValidEmail = (email) => {};

    return { formValid, inputValid, emailValid };
};

export default useValidateForm;
