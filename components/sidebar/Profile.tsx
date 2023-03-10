import Image from "next/image";
import styled from "styled-components";
import { ColumnContainer, RowContainer } from "../Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import { PersonalLink, PERSONAL_LINK } from "../../common/constant";

const Container = styled(ColumnContainer)`
  width: 200px;
`;

const IconContainer = styled(RowContainer)`
  justify-content: center;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  align-self: center;
`;

const Name = styled.div`
  align-self: center;
`;

export const Profile = () => {
  return (
    <Container>
      <Avatar
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/zzuhann-space.appspot.com/o/images%2F%F0%9F%8F%83%F0%9F%8F%BB_%E2%99%80%EF%B8%8F%F0%9F%8F%83%F0%9F%8F%BB%F0%9F%8F%83%F0%9F%8F%BD_%E2%99%80%EF%B8%8F%F0%9F%8F%83%F0%9F%8F%BB_%E2%99%82%EF%B8%8F%F0%9F%8F%83%F0%9F%8F%BD_%E2%99%82%EF%B8%8F.jpg?alt=media&token=23c0909b-f827-45d5-bb7b-cc0b4534ac33"
        width="100"
        height="100"
      />
      <Name>zzuhann</Name>
      <div>生活有很多種面向，不全然是看到的模樣。</div>
      <IconContainer>
        <a
          href={PersonalLink[PERSONAL_LINK["GITHUB"]]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
        <a
          href={PersonalLink[PERSONAL_LINK["LINKEDIN"]]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        <a href={`mailto:${PersonalLink[PERSONAL_LINK["LINKEDIN"]]}`}>
          <EmailIcon />
        </a>
      </IconContainer>
    </Container>
  );
};
