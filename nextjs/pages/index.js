import React, { useState } from 'react';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Modal } from '@redq/reuse-modal';
import '@redq/reuse-modal/lib/index.css';
import { Icon } from 'react-icons-kit';
import { iosArrowThinRight } from 'react-icons-kit/ionicons/iosArrowThinRight';
import { location } from 'react-icons-kit/icomoon/location';
import { phone } from 'react-icons-kit/icomoon/phone';
import { home } from 'react-icons-kit/entypo/home';
import { x } from 'react-icons-kit/feather/x';
import LanguageProvider from '@deadline/common/LanguageSwitcher/context/language.provider';
import LanguageSwitcher from '@deadline/common/LanguageSwitcher';
import languageConfig from '@deadline/common/LanguageSwitcher/config';
import NormalClock from '@deadline/components/NormalClock/NormalClock.js';
import Button from '@deadline/components/Button';
import ContactForm from '@deadline/components/MaterialContactFormTwo/MaterialContactForm';
import {
  MainContentWrapper,
  MainContentSection,
  NormalClockWrapper,
  LogoImageContainer,
  ButtonWrapper,
  MainWrapper,
  SideBar,
  Overlay,
  SidebarContent,
  About,
  Contact,
  Info,
  InfoItem,
  InfoIcon,
  SidebarClose,
  FooterSection,
} from '@deadline/common/ui/twentyfour.style';

import LogoImage from '@deadline/common/static/images/logoTwo.png';
import BG from '@deadline/common/static/images/twentyfour/bg.jpg';

// Language translation files
import localEng from '@deadline/common/data/translation/twentyfour/en.json';
import localDe from '@deadline/common/data/translation/twentyfour/de.json';
import { SOCIAL_PROFILES } from '@deadline/common/data/social-share/fourteen';
import { Container, SocialShare } from '../components';
import '../static/_styles.css';

// Language translation Config
const messages = {
  en: localEng,
  de: localDe,
};

const deadline = new Date(Date.parse(new Date()) + 60 * 24 * 60 * 60 * 1000);

const IndexPage = () => {
  const [state, setState] = useState({
    toggle: false,
  });

  const toggleHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    });
  };

  return (
    <LanguageProvider messages={messages}>
      <React.Fragment>
        <Head>
          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="/static/favicon/favicon.png"
          />
        </Head>
        <NextSeo
          config={{
            title: 'Chadev Development coming Soon',
            description: 'Chadev Opening soon!',
          }}
        />
        <Modal />
        <MainWrapper
          style={{
            backgroundImage: `url(${BG})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <MainContentWrapper>
            <Container className="mainContainer">
              <LogoImageContainer>
                <Link href={'/twentyfour'}>
                  <a>
                    <img src={LogoImage} alt="logo" />
                  </a>
                </Link>
              </LogoImageContainer>
              <MainContentSection>
                <h2>
                  <FormattedMessage id="mainMessage" />
                </h2>
                <NormalClockWrapper>
                  <NormalClock divider={true} countdown={deadline} />
                </NormalClockWrapper>
                <p>
                  <FormattedMessage id="description" />
                </p>
                <ButtonWrapper>
                  <Button
                    type="submit"
                    title="sidebarButtonText"
                    icon={<Icon icon={iosArrowThinRight} size={25} />}
                    className="info"
                    onClick={toggleHandle}
                  />
                </ButtonWrapper>
              </MainContentSection>
              <FooterSection>
                <SocialShare items={SOCIAL_PROFILES} />
                <p>
                  <FormattedMessage id="copyrightText" />
                </p>
              </FooterSection>
            </Container>
          </MainContentWrapper>
          <SideBar className={state.toggle === true ? 'expand' : ''}>
            <SidebarContent>
              <SidebarClose type="submit" aria-label="close">
                <Icon icon={x} size={33} onClick={toggleHandle} />
              </SidebarClose>
              <About>
                <h2>
                  <FormattedMessage id="aboutTitle" />
                </h2>
                <p>
                  <FormattedMessage id="aboutText" />
                </p>
              </About>

              <Contact>
                <h2>
                  <FormattedMessage id="contactTitle" />
                </h2>
                <ContactForm />
              </Contact>

              <Info>
                <InfoItem>
                  <InfoIcon>
                    <Icon icon={location} size={33} />
                  </InfoIcon>
                  <h4>
                    <FormattedMessage id="addressTitle" />
                  </h4>
                  <p>
                    <FormattedMessage id="addressDetails" />
                  </p>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <Icon icon={phone} size={32} />
                  </InfoIcon>
                  <h4>
                    <FormattedMessage id="phoneTitle" />
                  </h4>
                  <p>
                    <FormattedMessage id="phoneNumbers" />
                  </p>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <Icon icon={home} size={32} />
                  </InfoIcon>
                  <h4>
                    <FormattedMessage id="websiteTitle" />
                  </h4>
                  <p>
                    <FormattedMessage id="Websites" />
                  </p>
                </InfoItem>
              </Info>
            </SidebarContent>
            <Overlay className={state.toggle === true ? 'expand' : ''} />
          </SideBar>
        </MainWrapper>
        <LanguageSwitcher languageConfig={languageConfig} />
      </React.Fragment>
    </LanguageProvider>
  );
};

export default IndexPage;
