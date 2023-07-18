import { Stack } from '@mui/material';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { updateFirestoreById, uploadStorageImage } from '@/common/firebaseFun';
import { Button } from '@/components/common/Common';
import { Container, ImageContainer, InputContainer, InputStyle, TextAreaStyle, Title } from './EditProfile.style';
import { useStore } from '@/store/useStore';

export const EditProfile = () => {
  const { author, updateAuthor } = useStore();
  const [selectedFile, setSelectedFile] = useState<string>(author?.userImg || '');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const introRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setImgFile(event.target.files[0]);
  };

  const handleClearFile = () => {
    setSelectedFile('');
    setImgFile(null);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!imgFile) return;
    const url = await uploadStorageImage('profileImg', imgFile);
    setSelectedFile(url);
  };

  const updateProfileInfo = () => {
    if (!nameRef.current?.value) return;
    if (!introRef.current?.value) return;
    const newName = nameRef.current.value;
    const newIntro = introRef.current.value;
    updateFirestoreById({
      target: 'users',
      id: 'Xt8axl9b33aG6OuEled4U1SbtZ02',
      data: {
        name: newName,
        intro: newIntro,
        email: author?.email,
        img: selectedFile,
      },
    });
    updateAuthor({
      userName: newName,
      userIntro: newIntro,
      email: author?.email,
      userImg: selectedFile,
    });
  };

  return (
    <Container>
      <Title>Hello! {author?.userName}</Title>
      {selectedFile ? (
        <>
          <ImageContainer>
            <Image src={selectedFile} alt="self" layout="fill" />
          </ImageContainer>
          <Stack direction="row" gap="5px">
            <Button onClick={handleClearFile}>取消</Button>
            <Button onClick={handleSubmit}>上傳</Button>
          </Stack>
        </>
      ) : (
        <>
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="upload" />
          <label htmlFor="upload">
            <ImageContainer style={{ backgroundColor: '#ececec' }} />
          </label>
        </>
      )}
      <InputContainer>
        <label htmlFor="name">名稱</label>
        <InputStyle type="text" id="name" defaultValue={author?.userName} ref={nameRef} />
      </InputContainer>
      <InputContainer>
        <label htmlFor="intro">簡介</label>
        <TextAreaStyle defaultValue={author?.userIntro} ref={introRef} />
      </InputContainer>
      <Button onClick={updateProfileInfo}>更新</Button>
    </Container>
  );
};
