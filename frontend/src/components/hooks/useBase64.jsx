import React from "react";

const useBase64 = (initialValue = null) => {
    const [img, setImg] = React.useState(initialValue);

    const encode = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImg(reader.result);
            callback(reader.result);
        };
    };

    return [img, encode];
};

export default useBase64;
