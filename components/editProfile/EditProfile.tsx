import { Stack } from "@mui/material";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import {
  updateFirestoreById,
  uploadStorageImage,
} from "../../common/firebaseFun";
import { AuthContext } from "../../store/auth-context";
import { Button } from "../common/Common";

const Container = styled.div`
  border: 2px solid #20538f;
  border-radius: 20px;
  padding: 20px 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  position: relative;
  overflow: hidden;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const InputStyle = styled.input`
  border: 1px #8c8c8c solid;
  border-radius: 5px;
  padding: 5px;
`;

const TextAreaStyle = styled.textarea`
  padding: 10px;
  font-size: 14px;
`;

export const EditProfile = () => {
  const { state } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState<string>(
    state.userInfo.userImg
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const introRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setImgFile(event.target.files[0]);
  };

  const handleClearFile = () => {
    setSelectedFile("");
    setImgFile(null);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!imgFile) return;
    uploadStorageImage("profileImg", imgFile, setSelectedFile);
    console.log("檔案已上傳");
  };

  console.log(selectedFile);

  const updateProfileInfo = () => {
    if (!nameRef.current?.value) return;
    if (!introRef.current?.value) return;
    const newName = nameRef.current.value;
    const newIntro = introRef.current.value;
    updateFirestoreById({
      target: "users",
      id: "Xt8axl9b33aG6OuEled4U1SbtZ02",
      data: {
        name: newName,
        intro: newIntro,
        email: state.userInfo.email,
        img: selectedFile,
      },
    });
  };

  return (
    <Container>
      <Title>Hello! {state.userInfo.userName}</Title>
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
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload"
          />
          <label htmlFor="upload">
            <ImageContainer style={{ backgroundColor: "#ececec" }} />
          </label>
        </>
      )}
      <InputContainer>
        <label htmlFor="name">名稱</label>
        <InputStyle
          type="text"
          id="name"
          defaultValue={state.userInfo.userName}
          ref={nameRef}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="intro">簡介</label>
        <TextAreaStyle defaultValue={state.userInfo.userIntro} ref={introRef} />
      </InputContainer>
      <Button onClick={updateProfileInfo}>更新</Button>
    </Container>
  );
};
