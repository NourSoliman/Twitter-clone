import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string,
    value?: string,
    disabled?: boolean
}
const ImageUploadModal: React.FC<ImageUploadProps> = ({ label, value, disabled, onChange }) => {
    const [base64, setBase64] = useState(value)
    const handleChange = useCallback((base64: string) => {
        onChange(base64)
    }, [onChange])
    const handleImageDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result)
            handleChange(event.target.result)
        }
        reader.readAsDataURL(file)

    }, [handleChange])
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleImageDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    });
    return (
        <div
            {...getRootProps({
                className: "w-full p-4 text-white text-center border-2 border-dotted rounder-md border-entural-700"
            })}
        >
            <input  {...getInputProps()} />
            {base64 ? (
                <div className='flex items-center justify-center'>
                    <Image src={base64} height="100" width="100" alt="image" />
                </div>
            ) : (<p className='text-white'>{label}</p>)}
        </div>
    )
}

export default ImageUploadModal