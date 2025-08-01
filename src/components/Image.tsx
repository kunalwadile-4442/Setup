/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { App_url } from '../../utils/constants/static';

interface ImagesProps {
  type?: string;
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  auth?: boolean;
  label?: string
}

const Images: React.FC<ImagesProps> = (props) => {
  // const { access_token } = useSelector((state: any) => state[App_url.allReducers]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    if (!props.auth || window.location.hostname !== 'localhost') {
      img.src = props.src;

      img.onload = () => {
        setImageSrc(img.src);
      };
    }
    //  else if (access_token && window.location.hostname === 'localhost') {
    //   fetchData();
    // }
    return () => {
      img.src = '';
    };
  }, [props.src]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetchImageWithAuthorization(props.src);
  //     if (response?.status === 200) {
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
  //       setImageSrc(url);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // Handle the error as needed, such as displaying an error message to the user
  //   }
  // };

  // const fetchImageWithAuthorization = async (url: string) => {
  //   const headers = new Headers();
  //   headers.append('Authorization', access_token);
  //   const requestOptions: RequestInit = {
  //     method: 'GET',
  //     headers: headers,
  //     redirect: 'follow'
  //   };
  //   return fetch(url, requestOptions);
  // };

  const ImagePreview = () =>{
    return(
      <>
         <p className={`text-[#4E4E4E] text-sm pb-2  whitespace-nowrap`}>
          {props.label}
         </p>
      <picture className={`picture-opacity-1 ${props.imageClassName}`}>
        {imageSrc && <source type={props.type} srcSet={imageSrc} />}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={props.alt}
            loading="eager"
            className={props.className}
            width={props.width}
            height={props.height}
          />
        )}
      </picture>
       </>
    )
  }
  return (
    ImagePreview()
  );
}

export default Images;
