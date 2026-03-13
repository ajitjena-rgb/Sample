import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// ─── Design tokens ───────────────────────────────────────
const colors = {
  primary: '#11304F',
  primaryGray: '#666F77',
  emerald: '#48B5B5',
  orange: '#FEB060',
  orangeText: '#4D351D',
  divider: '#DDDFE4',
  purple: '#4F46E5',
  purpleDark: '#4338CA',
};

// ─── Animations ──────────────────────────────────────────
const shine = keyframes`
  0%   { transform: translateX(-120%) rotate(-45deg); }
  60%  { transform: translateX(300%) rotate(-45deg); }
  100% { transform: translateX(300%) rotate(-45deg); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Styled components ────────────────────────────────────
const PageWrapper = styled.div`
  font-family: 'Barlow', sans-serif;
  background: #e5e7eb;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhoneFrame = styled.div`
  width: 390px;
  min-height: 844px;
  background: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(90deg, #4f46e5 0%, #4338ca 100%);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WordmarkWrapper = styled.div`
  line-height: 1;
`;

const WordmarkTitle = styled.p`
  color: #ffffff;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const WordmarkSub = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 7.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Main = styled.main`
  background: #ffffff;
  padding: 20px 20px 112px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 0 24px;
  box-shadow:
    0 1.16px 26px rgba(34, 38, 65, 0.08),
    0 0.46px 9.8px rgba(34, 38, 65, 0.06),
    0 0.1px 3.5px rgba(34, 38, 65, 0.04);
  animation: ${fadeUp} 0.55s ease both;
`;

const BadgeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
`;

const CardTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
`;

const Spacer = styled.div`
  height: 16px;
`;

const AccountDetailsRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 24px;
`;

const AccountDetailItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.primaryGray};
  line-height: 16px;
`;

const DetailValue = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary};
  line-height: 24px;
`;

const FundCardWrapper = styled.div`
  padding: 0 24px;
  animation: ${fadeUp} 0.55s ease 0.15s both;
`;

const FundCard = styled.div`
  position: relative;
  background: #f4f6f8;
  border-radius: 16px;
  padding: 28px 16px 16px;
`;

const InstantBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 16px;
  overflow: hidden;
  border-radius: 8px;
  background: ${colors.orange};
`;

const InstantBadgeInner = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  position: relative;
`;

const InstantText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.orangeText};
  line-height: 1.5;
`;

const ShineBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 12px;
  transform: rotate(-45deg);
  opacity: 0.6;
  background: rgba(255, 255, 255, 0.55);
  filter: blur(1px);
  animation: ${shine} 2.8s ease-in-out infinite;
`;

const FundCardContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const IconCircle = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
`;

const FundCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const FundCardTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 20px;
`;

const FundCardDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.primaryGray};
  line-height: 18px;
`;

const AddFundsButton = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 42px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.emerald};
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { filter: brightness(1.05); }
  &:active { transform: scale(0.97); }
`;

const SecurityNote = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const SecurityText = styled.p`
  font-size: 12px;
  color: ${colors.primaryGray};
`;

const BackButtonRow = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #30989a;
  line-height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover { text-decoration: underline; }
`;

const ChatButtonWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  right: 20px;
`;

const ChatButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { filter: brightness(1.05); }
  &:active { transform: scale(0.95); }
`;

// ─── Component ────────────────────────────────────────────
export default function AccountCreated() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <PhoneFrame>

        {/* Header */}
        <Header>
          <LogoWrapper>
            {/* Shield icon */}
            <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0L0 5.5V16.5C0 25.07 6.27 33.08 14 34C21.73 33.08 28 25.07 28 16.5V5.5L14 0Z"
                    fill="white" fillOpacity="0.25"/>
              <path d="M14 2.5L2 7.3V16.5C2 23.9 7.44 30.8 14 31.9C20.56 30.8 26 23.9 26 16.5V7.3L14 2.5Z"
                    fill="white" fillOpacity="0.15"/>
              <path d="M10 17.5L13 20.5L19 13.5" stroke="white" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Wordmark */}
            <WordmarkWrapper>
              <WordmarkTitle>TruStone</WordmarkTitle>
              <WordmarkSub>Financial</WordmarkSub>
            </WordmarkWrapper>
          </LogoWrapper>
        </Header>

        {/* Page body */}
        <Main>

          {/* Card */}
          <Card>

            {/* Success badge + title */}
            <BadgeSection>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.2119 7.60184C32.1234 3.77808 37.8766 3.77808 40.7881 7.60184C42.5127 9.86693 45.4001 10.9179 48.1773 10.2913C52.8654 9.23355 57.2727 12.9317 57.0451 17.7323C56.9103 20.576 58.4467 23.2371 60.9768 24.5422C65.2481 26.7454 66.2471 32.4113 62.987 35.9425C61.0558 38.0343 60.5222 41.0603 61.6215 43.6865C63.4773 48.1197 60.6007 53.1022 55.8335 53.7117C53.0095 54.0727 50.6557 56.0479 49.8097 58.7662C48.3817 63.3551 42.9754 65.3229 38.9317 62.7255C36.5364 61.1869 33.4636 61.1869 31.0683 62.7255C27.0246 65.3229 21.6183 63.3551 20.1903 58.7662C19.3443 56.0479 16.9905 54.0727 14.1665 53.7117C9.39934 53.1022 6.5227 48.1197 8.37846 43.6865C9.47776 41.0603 8.94419 38.0343 7.01299 35.9425C3.75288 32.4113 4.75193 26.7454 9.02317 24.5422C11.5533 23.2371 13.0897 20.576 12.9549 17.7323C12.7273 12.9317 17.1346 9.23355 21.8227 10.2913C24.5999 10.9179 27.4873 9.86693 29.2119 7.60184Z" fill="#43D694"/>
                <g clipPath="url(#clip0_2708_14616)">
                  <path d="M43.4168 29.757L32.4619 40.7119L26.5423 34.7923" stroke="white" strokeWidth="3.4375" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_2708_14616">
                    <rect width="22" height="22" fill="white" transform="translate(24 24)"/>
                  </clipPath>
                </defs>
              </svg>

              <CardTitle>Account created successfully</CardTitle>
            </BadgeSection>

            <Spacer />

            {/* Account details */}
            <AccountDetailsRow>
              <AccountDetailItem>
                <DetailLabel>Account No.</DetailLabel>
                <DetailValue>123456889</DetailValue>
              </AccountDetailItem>
              <AccountDetailItem>
                <DetailLabel>Date &amp; Time</DetailLabel>
                <DetailValue>Feb 6, 2026, 5:39 PM</DetailValue>
              </AccountDetailItem>
            </AccountDetailsRow>

            <Spacer />

            {/* Fund account card */}
            <FundCardWrapper>
              <FundCard>

                {/* INSTANT badge */}
                <InstantBadge>
                  <InstantBadgeInner>
                    <InstantText>INSTANT</InstantText>
                    <ShineBar />
                  </InstantBadgeInner>
                </InstantBadge>

                {/* Card content row */}
                <FundCardContent>

                  {/* Dollar icon circle */}
                  <IconCircle>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#48B5B5" strokeWidth="1.8"/>
                      <path d="M12 6V18M9.5 15.5C9.5 15.5 10.5 17 12 17C13.66 17 15 15.88 15 14.5C15 13.12 13.66 12.5 12 12C10.34 12 9 11.38 9 10C9 8.62 10.34 7.5 12 7.5C13.5 7.5 14.5 8.5 14.5 8.5"
                            stroke="#48B5B5" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </IconCircle>

                  {/* Text */}
                  <FundCardText>
                    <FundCardTitle>Fund Your Account instantly</FundCardTitle>
                    <FundCardDescription>
                      Skip the 5-day bank transfer wait or mailing checks. Move money securely.
                    </FundCardDescription>
                  </FundCardText>

                </FundCardContent>

                {/* Add Funds button */}
                <AddFundsButton onClick={() => navigate('/add-funds')}>Add Funds Now</AddFundsButton>

                {/* Security note */}
                <SecurityNote>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#666F77" strokeWidth="1.3"/>
                    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="#666F77" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <SecurityText>Encrypted &amp; Secure Digital Funding</SecurityText>
                </SecurityNote>

              </FundCard>
            </FundCardWrapper>

            {/* Back to dashboard */}
            <BackButtonRow>
              <BackButton>Back to dashboard</BackButton>
            </BackButtonRow>

          </Card>
        </Main>

        {/* Floating chat button */}
        <ChatButtonWrapper>
          <ChatButton>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="10" r="5.5" stroke="white" strokeWidth="1.6"/>
              <circle cx="12" cy="10" r="2" fill="white"/>
              <path d="M8.5 16.5C8.5 16.5 9.5 19 12 19C14.5 19 15.5 16.5 15.5 16.5"
                    stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ChatButton>
        </ChatButtonWrapper>

      </PhoneFrame>
    </PageWrapper>
  );
}
