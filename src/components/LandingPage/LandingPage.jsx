import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { Image } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faYoutube,
  faInstagram,
  faDiscord,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

import CommonContainer from '../../uikit/CommonContainer/CommonContainer'
import { PrimaryButton } from '../../uikit/Buttons/Buttons'

const LandingPage = () => {
  return (
    <Landing>
      <CommonContainer>
        <Header>
          <HeaderLogo>
            <Image
              preview={false}
              src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
              alt=""
              style={{
                width: '180px',
                height: 'auto',
                paddingTop: '1.5rem',
                marginBottom: '-40px',
              }}
            />
          </HeaderLogo>
          <SocialContainer>
            {/* <a href="#" target="_blank">
              <FontAwesomeIcon icon={faYoutube} color="white" />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faInstagram} color="white" />
            </a> */}
            <a href="https://discord.com/invite/xkh9AEbgNH" target="_blank">
              <FontAwesomeIcon icon={faDiscord} color="white" />
            </a>
            <a href="https://twitter.com/phunkyApeYC" target="_blank">
              <FontAwesomeIcon icon={faTwitter} color="white" />
            </a>
          </SocialContainer>
        </Header>
      </CommonContainer>
      <CommonContainer>
        <Content>
          <ReactPlayer
            playing
            loop
            muted
            url="https://ik.imagekit.io/nldjkvbypwl/flipped_FNa-Twypl.mp4?updatedAt=1640903473924"
            width="100%"
            height="auto"
          />
          <CTA>
            <CTAText>
              Welcome to the <br />
              Phunky ape <br />
              yacht club
            </CTAText>
            <CTAButton>
              <Link to="/marketplace">
                <PrimaryButton text="Enter marketplace" fat />
              </Link>
            </CTAButton>
          </CTA>
        </Content>
        <ProjectDescription>
          A limitless NFT collection where the token itself doubles as a
          statement that we are sick
          <br />
          and tired of the red tape mentality perpetuated by the right facing
          Blue Chips.
        </ProjectDescription>
      </CommonContainer>
      <Footer>
        <FooterLogo>
          <Image
            preview={false}
            src="https://ik.imagekit.io/nldjkvbypwl/payc_logo_Djgp2I0OZ8p.png?updatedAt=1640924429847"
            alt=""
            style={{
              width: '200px',
              height: 'auto',
            }}
          />
        </FooterLogo>
        <FooterLinks>
          <SocialContainer className="sc-footer">
            {/* <a href="#" target="_blank">
              <FontAwesomeIcon icon={faYoutube} color="white" />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faInstagram} color="white" />
            </a> */}
            <a href="https://discord.com/invite/xkh9AEbgNH" target="_blank">
              <FontAwesomeIcon icon={faDiscord} color="white" />
            </a>
            <a href="https://twitter.com/phunkyApeYC" target="_blank">
              <FontAwesomeIcon icon={faTwitter} color="white" />
            </a>
          </SocialContainer>
          <CopyRight>© 2022 NOT Yuga Labs LLC</CopyRight>
        </FooterLinks>
      </Footer>
    </Landing>
  )
}

const Landing = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  z-index: 10;
`

const HeaderLogo = styled.div`
  grid-column-start: 2;
  display: flex;
  justify-content: center;
`

const SocialContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px;
  margin-bottom: -40px;

  &.sc-footer {
    margin-bottom: 0;
  }

  a {
    padding: 20px 0 20px 20px;
  }
`

const Content = styled.div`
  display: flex;
  position: relative;
`

const CTA = styled.div`
  position: absolute;
  background: black;
  padding: 24px 0 0 5rem;
  width: 360px;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const CTAText = styled.div`
  font-size: 1.7em;
  line-height: 1.2;
  font-weight: 800;
  text-transform: uppercase;
  font-style: italic;
  text-align: right;
`

const CTAButton = styled.div`
  width: 90%;
  padding: 1rem 0 1.5rem 0;
  border-bottom: 1px solid white;
`

const ProjectDescription = styled.div`
  padding: 3rem 15px;
  font-size: 1rem;
  font-weight: 400;
`

const Footer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid white;
  padding: 3rem 0;
`

const FooterLogo = styled.div`
  grid-column-start: 2;
  display: flex;
  justify-content: center;
`

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CopyRight = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  font-size: 0.65rem;
  color: #bfc500;
`

export default LandingPage
