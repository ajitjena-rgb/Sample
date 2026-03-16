import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBack from '../components/icons/ArrowBack';
import ChevronRight from '../components/icons/ChevronRight';
import PrimaryButton from '../components/PrimaryButton';

// ─── Design tokens ────────────────────────────────────────
const colors = {
  primary:     '#11304F',
  primaryGray: '#666F77',
  gray2:       '#6F7489',
  blackMain:   '#1D1D20',
  bgLight:     '#F4F6F8',
  bgLighter:   '#F8F8FA',
  divider:     '#DDDFE4',
  disabled:    '#B6B9C3',
  purple:      '#4F46E5',
  purpleDark:  '#4338CA',
};

// ─── Layout ───────────────────────────────────────────────
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
  display: flex;
  flex-direction: column;
`;

// ─── Header ───────────────────────────────────────────────
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(90deg, #4f46e5 0%, #4338ca 100%);
  position: relative;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.15); }
`;

const HeaderTitle = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const HeaderSpacer = styled.div`width: 32px;`;

// ─── Stepper ──────────────────────────────────────────────
const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 20px;
  background: ${colors.bgLight};
  border-radius: 8px;
  margin: 12px 20px 0;
`;

const StepLabel = styled.span`
  font-size: 12px;
  font-weight: ${({ active }) => (active ? '700' : '400')};
  color: ${({ active }) => (active ? colors.primary : colors.gray2)};
  white-space: nowrap;
`;

// ─── Content ──────────────────────────────────────────────
const Content = styled.div`
  flex: 1;
  padding: 12px 20px 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Account card
const AccountCard = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 17px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AccountCardLabel = styled.p`
  font-size: 10px;
  font-weight: 500;
  color: ${colors.primaryGray};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BankIconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${colors.bgLight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AccountName = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.blackMain};
  line-height: 1;
`;

const AccountNumber = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray2};
  line-height: 1;
`;

// Section heading
const SectionHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 30px;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.primaryGray};
  margin-top: 4px;
`;

// Payment methods
const MethodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Row of 3 quick-pay tiles
const QuickPayRow = styled.div`
  display: flex;
  gap: 12px;
`;

const QuickPayTile = styled.button`
  flex: 1;
  height: 72px;
  background: ${({ selected }) => (selected ? '#EEF2FF' : colors.bgLighter)};
  border: 1.5px solid ${({ selected }) => (selected ? colors.purple : 'transparent')};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.15s;
  padding: 8px;
  &:hover { border-color: ${colors.purple}; }
  &:active { transform: scale(0.97); }
`;

// Full-width payment tile (radio)
const PaymentTile = styled.button`
  width: 100%;
  height: 72px;
  background: ${({ selected }) => (selected ? '#EEF2FF' : colors.bgLighter)};
  border: 1.5px solid ${({ selected }) => (selected ? colors.purple : 'transparent')};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${colors.purple}; }
  &:active { transform: scale(0.98); }
`;

const PaymentTileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PaymentTileLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.primary};
  line-height: 24px;
  white-space: nowrap;
`;

const PaymentTileRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Radio circle — teal when checked (matches Figma #30989A)
const RadioCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ checked, teal }) => checked ? (teal ? '#30989A' : colors.purple) : colors.divider};
  background: ${({ checked, teal }) => checked ? (teal ? '#30989A' : colors.purple) : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  }
`;

// ─── Card form expanded panel ──────────────────────────────
const CardTileWrapper = styled.div`
  background: ${colors.bgLighter};
  border: 1.5px solid ${({ expanded }) => (expanded ? '#30989A' : 'transparent')};
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
`;

const CardTileHeader = styled.button`
  width: 100%;
  height: 72px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  cursor: pointer;
`;

const CardFormBody = styled.div`
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.primary};
  line-height: 24px;
  margin-bottom: 4px;
`;

const FieldInput = styled.input`
  width: 100%;
  height: 42px;
  background: #fff;
  border: 1px solid ${colors.divider};
  border-radius: 16px;
  padding: 0 16px 0 18px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.primary};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder { color: ${colors.gray2}; }
  &:focus { border-color: #30989A; }
`;

const FieldRow = styled.div`
  display: flex;
  gap: 12px;

  > div { flex: 1; }
`;

const SecurityTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #E9F5F5;
  border-radius: 8px;
  padding: 6px 12px;
`;

const SecurityTagText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0C585A;
  line-height: 24px;
  text-align: center;
`;

// ─── Bottom bar ───────────────────────────────────────────
const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px 28px;
  background: #fff;
  border-top: 1px solid ${colors.divider};
  display: flex;
  gap: 16px;
`;

const SecondaryButton = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 16px;
  background: ${colors.bgLight};
  color: ${colors.primary};
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { filter: brightness(0.95); }
  &:active { transform: scale(0.98); }
`;

const ProceedBtn = styled.button`
  flex: 1;
  height: 42px;
  border-radius: 16px;
  background: ${({ disabled }) => (disabled ? colors.bgLight : '#48B5B5')};
  color: ${({ disabled }) => (disabled ? colors.disabled : '#fff')};
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s;
  &:hover:not(:disabled) { filter: brightness(1.05); }
  &:active:not(:disabled) { transform: scale(0.98); }
`;

// ─── SVG logos ────────────────────────────────────────────
function ApplePayLogo() {
  return (
    <svg height="22" viewBox="0 0 51 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.8 3.1c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.5 3-1.5zm1 1.6c-1.6-.1-3 .9-3.8.9-.8 0-2-.9-3.3-.9C2.1 4.8.5 5.8-.2 7.4c-1.5 2.5-.4 6.2 1 8.2.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.6-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3.2 0-2 1.7-3 1.8-3-.9-1.5-2.4-1.4-2.5-1.3zm8 10.9V6.3h4c3.6 0 6.1 2.5 6.1 6.2 0 3.7-2.5 6.2-6.2 6.2h-3.9zm1.9-1.7h2c2.5 0 3.9-1.7 3.9-4.5s-1.4-4.5-3.9-4.5h-2v9zm9.4.4c0-1.9 1.4-3 4-3.2l2.9-.2v-.8c0-1.2-.8-1.9-2.1-1.9-1.2 0-2 .6-2.2 1.5h-1.8c.1-1.8 1.6-3.1 4-3.1 2.4 0 3.9 1.3 3.9 3.3v6.9h-1.8v-1.7h-.1c-.5 1.1-1.7 1.8-3 1.8-1.9 0-3.2-1.2-3.2-2.9l-.6.3zm6.9-.9v-.9l-2.6.2c-1.3.1-2 .7-2 1.6 0 .9.8 1.5 1.9 1.5 1.5 0 2.7-1 2.7-2.4zm4.1 7.6v-1.6c.1 0 .5.1.7.1.9 0 1.4-.4 1.8-1.5l.2-.5-3.7-10.2h2l2.6 8.1h.1l2.6-8.1h2l-3.9 11c-.9 2.5-1.9 3.3-4 3.3-.2 0-.3 0-.4-.1v.5z" fill="#000"/>
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg height="24" viewBox="0 0 54 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.4 11.5v6.7h-2.1V2.3h5.7c1.4 0 2.6.5 3.6 1.4.9.9 1.4 2 1.4 3.4 0 1.4-.5 2.5-1.4 3.4-1 .9-2.1 1.4-3.6 1.4h-3.6v-.4zm0-7.4v5.6h3.7c.8 0 1.5-.3 2-.8.5-.5.8-1.2.8-1.9 0-.8-.3-1.4-.8-1.9-.5-.5-1.2-.8-2-.8h-3.7v-.2zm13.7 2.3c1.5 0 2.7.4 3.6 1.3.9.9 1.3 2 1.3 3.5v7H42v-1.6h-.1c-.9 1.3-2 2-3.4 2-1.2 0-2.2-.4-3.1-1.1-.8-.7-1.2-1.7-1.2-2.7 0-1.2.4-2.1 1.3-2.7.9-.7 2-.9 3.5-.9 1.3 0 2.3.2 3.1.7v-.5c0-.7-.3-1.3-.9-1.8-.6-.5-1.2-.7-2-.7-1.1 0-2 .5-2.7 1.4l-1.7-1.1c.9-1.3 2.4-1.9 4.3-1.9l-.2.1zm-2.8 8c0 .6.2 1 .7 1.3.5.3 1 .5 1.6.5.9 0 1.7-.3 2.3-.9.7-.6 1-1.4 1-2.2-.6-.5-1.5-.7-2.7-.7-.9 0-1.6.2-2.2.6-.4.4-.7.9-.7 1.4zm17.4-7.6L48.2 18h-2.1l-2.8-7.2-2.8 7.2H38.4l-6.2-11.2h2.3l4.2 8.6 2.8-7.2h2l2.8 7.2 4.2-8.6h2z" fill="#5F6368"/>
      <path d="M13.5 10.5c0-.6-.1-1.3-.2-1.9H6.9v3.6h3.7c-.2.9-.7 1.7-1.4 2.2v1.9h2.3c1.3-1.2 2-3 2-5.8z" fill="#4285F4"/>
      <path d="M6.9 18.3c1.9 0 3.5-.6 4.6-1.7l-2.3-1.9c-.6.4-1.4.7-2.3.7-1.8 0-3.3-1.2-3.8-2.8H.7v1.9c1.1 2.2 3.3 3.8 6.2 3.8z" fill="#34A853"/>
      <path d="M3.1 12.6c-.3-.8-.3-1.6 0-2.4V8.3H.7C-.2 10.1-.2 12.2.7 13.9l2.4-1.3z" fill="#FBBC04"/>
      <path d="M6.9 7.4c1 0 1.9.4 2.6 1l1.9-1.9C10.3 5.4 8.6 4.8 6.9 4.8c-2.9 0-5 1.6-6.2 3.8l2.4 1.9c.5-1.6 2-2.8 3.8-2.8v-.3z" fill="#EA4335"/>
    </svg>
  );
}

function CashAppLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#00D632"/>
      <path d="M19.1 8.5l-1.1-.3c.1-.5.1-.8.1-1.2h-1.8c0 .4-.1.8-.2 1.2l-4.6-1.2A2.3 2.3 0 008 9.2c0 1 .6 1.8 1.5 2.1l3.6 1.1c.3.1.5.3.5.6 0 .4-.4.7-.8.7H9.4c-.3 0-.6-.1-.9-.3l-.9 1.6c.4.3.9.5 1.5.5l-.1.2V16h1.8l.1-.4c.2 0 .5.1.7.1l4.7 1.2c.3.1.6.1.9.1 1.2 0 2.4-.9 2.4-2.2 0-1-.6-1.8-1.5-2.1L14.6 12c-.3-.1-.5-.3-.5-.6 0-.4.4-.7.9-.7h2.3c.2 0 .4.1.6.2l.9-1.6c-.4-.2-.8-.4-1.3-.5l.1-.2V8h-1.9l-.1.5h-.1" fill="white"/>
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg width="38" height="13" viewBox="0 0 38 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5.4L9.6 12.6H6.3L3.9 2.9C3.8 2.5 3.6 2.2 3.3 2 2.6 1.6 1.8 1.3 1 1.1L1.1.4h5.3c.7 0 1.3.5 1.4 1.2l1.3 7L12.1.4h3.4v0zm13.4 8.2c0-3.2-4.5-3.4-4.5-4.9 0-.4.4-.9 1.3-1 .4 0 1.6-.1 2.9.5l.5-2.5A8 8 0 0025 .2c-3.2 0-5.5 1.7-5.5 4.1 0 1.8 1.6 2.8 2.8 3.4 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.6 0-2.5-.4-3.2-.8l-.6 2.6c.7.3 2 .6 3.3.6 3.4 0 5.6-1.7 5.6-4.2zM36 12.6h3L36.3.4h-2.7c-.6 0-1.1.3-1.3 1l-4.7 11.2H31l.7-1.8h4.1l.2 1.8zm-3.5-4.4l1.7-4.6.9 4.6h-2.6zM18.6.4L16 12.6h-3.2L15.4.4h3.2z" fill="#1A1F71"/>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="10" r="9" fill="#EB001B"/>
      <circle cx="17" cy="10" r="9" fill="#F79E1B"/>
      <path d="M13 3.5a9 9 0 010 13A9 9 0 0113 3.5z" fill="#FF5F00"/>
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M3 10H21M5 10V21M19 10V21M12 3L21 10H3L12 3Z"
            stroke="#48B5B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="9" y="14" width="6" height="7" rx="1" stroke="#48B5B5" strokeWidth="1.6"/>
    </svg>
  );
}

// ─── Payment methods config ───────────────────────────────
const QUICK_PAY = [
  { id: 'apple',  label: 'Apple Pay',  Logo: ApplePayLogo },
  { id: 'google', label: 'Google Pay', Logo: GooglePayLogo },
  { id: 'cash',   label: 'Cash App',   Logo: CashAppLogo },
];

// ─── Component ────────────────────────────────────────────
export default function PaymentSource() {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;

  const [selected, setSelected] = useState(null);
  const [card, setCard] = useState({ number: '', cvv: '', expiry: '' });
  const [bank, setBank] = useState({ account: '', routing: '' });

  const cardComplete = card.number.length >= 15 && card.cvv.length >= 3 && card.expiry.length >= 4;
  const bankComplete = bank.account.length >= 6 && bank.routing.length === 9;
  const canProceed = selected && (
    (selected === 'card' && cardComplete) ||
    (selected === 'bank' && bankComplete) ||
    (selected !== 'card' && selected !== 'bank')
  );

  return (
    <PageWrapper>
      <PhoneFrame>

        {/* Header */}
        <Header>
          <BackBtn onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowBack size={22} color="#ffffff" />
          </BackBtn>
          <HeaderTitle>Add funds</HeaderTitle>
          <HeaderSpacer />
        </Header>

        {/* Stepper */}
        <StepperWrapper>
          <StepLabel>Amount</StepLabel>
          <ChevronRight size={14} color="#C5CBD2" />
          <StepLabel active>Payment Source</StepLabel>
          <ChevronRight size={14} color="#C5CBD2" />
          <StepLabel>Review</StepLabel>
        </StepperWrapper>

        {/* Content */}
        <Content>

          {/* Account target card */}
          <AccountCard>
            <AccountCardLabel>Adding funds to</AccountCardLabel>
            <AccountRow>
              <BankIconCircle>
                <BankIcon />
              </BankIconCircle>
              <AccountInfo>
                <AccountName>Primary Saving Account</AccountName>
                <AccountNumber>xxxxxxxx012</AccountNumber>
              </AccountInfo>
            </AccountRow>
          </AccountCard>

          {/* Section heading */}
          <div>
            <SectionHeading>How would you like to fund this?</SectionHeading>
            <SectionSubtitle>Choose a payment method</SectionSubtitle>
          </div>

          {/* Payment methods */}
          <MethodsWrapper>

            {/* Quick-pay row */}
            <QuickPayRow>
              {QUICK_PAY.map(({ id, label, Logo }) => (
                <QuickPayTile
                  key={id}
                  selected={selected === id}
                  onClick={() => setSelected(id)}
                  aria-label={label}
                >
                  <Logo />
                  {id === 'cash' && (
                    <span style={{ fontSize: 10, fontWeight: 600, color: colors.primary, marginTop: 2 }}>
                      Cash App
                    </span>
                  )}
                </QuickPayTile>
              ))}
            </QuickPayRow>

            {/* Credit / Debit — expandable */}
            <CardTileWrapper expanded={selected === 'card'}>
              <CardTileHeader onClick={() => setSelected(selected === 'card' ? null : 'card')}>
                <PaymentTileLeft>
                  <RadioCircle checked={selected === 'card'} teal />
                  <PaymentTileLabel>Credit or Debit cards</PaymentTileLabel>
                </PaymentTileLeft>
                <PaymentTileRight>
                  <VisaLogo />
                  <MastercardLogo />
                </PaymentTileRight>
              </CardTileHeader>

              {selected === 'card' && (
                <CardFormBody>
                  {/* Card number */}
                  <div>
                    <FieldLabel>Card number</FieldLabel>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
                        pointerEvents: 'none'
                      }}>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                          <rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="#DDDFE4"/>
                          <rect x="0" y="3" width="16" height="2.5" fill="#DDDFE4"/>
                        </svg>
                      </span>
                      <FieldInput
                        style={{ paddingLeft: 42 }}
                        type="text"
                        inputMode="numeric"
                        placeholder="Card number"
                        maxLength={19}
                        value={card.number}
                        onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim() }))}
                      />
                    </div>
                  </div>

                  {/* CVV + Expiry */}
                  <FieldRow>
                    <div>
                      <FieldLabel>CVV</FieldLabel>
                      <FieldInput
                        type="password"
                        inputMode="numeric"
                        placeholder="CVV"
                        maxLength={4}
                        value={card.cvv}
                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g,'') }))}
                      />
                    </div>
                    <div>
                      <FieldLabel>Expiration date</FieldLabel>
                      <FieldInput
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={card.expiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g,'');
                          if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2,4);
                          setCard(c => ({ ...c, expiry: v }));
                        }}
                      />
                    </div>
                  </FieldRow>

                  {/* Security note */}
                  <SecurityTag>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="#0C585A" strokeWidth="1.8"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" stroke="#0C585A" strokeWidth="1.8" strokeLinecap="round"/>
                      <circle cx="12" cy="16" r="1.5" fill="#0C585A"/>
                    </svg>
                    <SecurityTagText>Your card info is stored securely and encrypted.</SecurityTagText>
                  </SecurityTag>
                </CardFormBody>
              )}
            </CardTileWrapper>

            {/* Bank transfer — expandable */}
            <CardTileWrapper expanded={selected === 'bank'}>
              <CardTileHeader onClick={() => setSelected(selected === 'bank' ? null : 'bank')}>
                <PaymentTileLeft>
                  <RadioCircle checked={selected === 'bank'} teal />
                  <PaymentTileLabel>Bank transfer</PaymentTileLabel>
                </PaymentTileLeft>
              </CardTileHeader>

              {selected === 'bank' && (
                <CardFormBody>
                  {/* Account Number */}
                  <div>
                    <FieldLabel>Account Number</FieldLabel>
                    <FieldInput
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter account number"
                      value={bank.account}
                      onChange={e => setBank(b => ({ ...b, account: e.target.value.replace(/\D/g, '') }))}
                    />
                  </div>

                  {/* Routing Number */}
                  <div>
                    <FieldLabel>Routing Number</FieldLabel>
                    <FieldInput
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 9-digit routing number"
                      maxLength={9}
                      value={bank.routing}
                      onChange={e => setBank(b => ({ ...b, routing: e.target.value.replace(/\D/g, '') }))}
                    />
                  </div>

                  {/* Security note */}
                  <SecurityTag>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="#0C585A" strokeWidth="1.8"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" stroke="#0C585A" strokeWidth="1.8" strokeLinecap="round"/>
                      <circle cx="12" cy="16" r="1.5" fill="#0C585A"/>
                    </svg>
                    <SecurityTagText>Your bank info is stored securely and encrypted.</SecurityTagText>
                  </SecurityTag>
                </CardFormBody>
              )}
            </CardTileWrapper>

          </MethodsWrapper>
        </Content>

        {/* Bottom action bar */}
        <BottomBar>
          <SecondaryButton onClick={() => navigate(-1)}>Previous</SecondaryButton>
          <ProceedBtn
            disabled={!canProceed}
            onClick={canProceed ? () => navigate('/review', { state: { amount, method: selected } }) : undefined}
          >
            Proceed
          </ProceedBtn>
        </BottomBar>

      </PhoneFrame>
    </PageWrapper>
  );
}
