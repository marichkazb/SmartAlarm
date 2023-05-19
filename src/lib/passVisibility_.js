import { useState } from 'react';

export const PassVisibility_ = () => {
    const [passwordVisibility_, setPasswordVisibility] = useState(true);
    const [rightIcon_, setRightIcon] = useState('eye');

    const handlePasswordVisibility_ = () => {
        if (rightIcon_ === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility_);
        } else if (rightIcon_ === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility_);
        }
    };

    return {
        passwordVisibility_,
        rightIcon_,
        handlePasswordVisibility_
    };

};