import { useEffect, useState, useRef } from 'react';
import { FILE_TYPES_ALLOW, SIZE } from '../../constants';

type AvatarProps = {
  value: string | undefined;
  onClick: (value: string) => void;
};

const Avatar = (props: AvatarProps) => {
  const [image, setImage] = useState<string | undefined>('');
  const [isValid, setIsValid] = useState<string>('');
  const fileUpLoad = useRef<HTMLInputElement>(null);

  const onFileUpload = () => {
    if (!fileUpLoad.current) return;
    fileUpLoad.current.click();
  };

  useEffect(() => {
    setImage(props.value);
  }, [image, props.value]);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (!FILE_TYPES_ALLOW.includes(file.type)) {
        setIsValid('File extension:JPEG,PNG,JPG');
        return;
      } else {
        setIsValid('');
      }

      let fileSize = file.size / SIZE;
      if (fileSize > 2) {
        setIsValid('Maximum file size < 2 MB');
        return;
      } else {
        setIsValid('');
      }
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const readURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target;
    if (input.files && input.files[0]) {
      toBase64(input.files[0]).then((value: any) => {
        props.onClick(value);
        setImage(value);
      });
    }
  };

  return (
    <>
      <div className="avatar-wrapper">
        <img className="profile-pic" src={image} alt="" />
        <div className="upload-button" onClick={onFileUpload}>
          <i className="fa fa-arrow-circle-up" />
        </div>
        <input
          className="file-upload"
          ref={fileUpLoad}
          type="file"
          accept="image/*"
          name="AvatarImage"
          onChange={e => readURL(e)}
        />
      </div>
      <p className="alert-file-validation">{isValid}</p>
    </>
  );
};

export default Avatar;
