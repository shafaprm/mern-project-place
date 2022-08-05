import React, { useRef, useState, useEffect } from 'react';

import Button from './Button.js';
import styles from './ImageUpload.module.css';

const ImageUpload = (props) => {
    const chooseImageRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(!imageFile) return;

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(imageFile);
        
        //@alternative
        //@delete fileReader.onLoad
        //@add fileReader.onloadend = () => {setPreviewUrl(fileReader.result)}
    }, [imageFile]);

    const onImageChangeHandler = (event) => {
        let choosedFile;
        let localIsValid = isValid;
        if(event.target.files && event.target.files.length === 1){
            choosedFile = event.target.files[0];
            setImageFile(choosedFile);
            setIsValid(true);
            localIsValid = true;
        }else{
            setIsValid(false);
            localIsValid = false;
        }
        props.onInput(props.id, choosedFile, localIsValid);
    }

    const chooseImageHandler = () => {
        chooseImageRef.current.click()
    };

    return (
        <div className = {styles['form-control']}>
            <input id = {props.id} type = "file" style = {{display : 'none'}} accept = ".jpg,.png,.jpeg" ref = {chooseImageRef} onChange = {onImageChangeHandler}/>
            <div className = {`${styles['image-upload']} ${props.center && 'center'}`}>
                <div className = {styles['image-upload__preview']}>
                    {previewUrl && <img src = {previewUrl} alt = "preview" />}
                </div>
            </div>
            <Button type = "button" onClick = {chooseImageHandler}>choose image</Button>
            {!isValid && <p>{props.errorMessage}</p>}
        </div>
    )
}

export default ImageUpload;