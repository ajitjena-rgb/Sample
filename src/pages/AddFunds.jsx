import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBack from '../components/icons/ArrowBack';
import ChevronRight from '../components/icons/ChevronRight';
import Tag from '../components/Tag';
import PrimaryButton from '../components/PrimaryButton';

// ─── Design tokens ────────────────────────────────────────
const colors = {
  primary: '#11304F',
  primaryGray: '#666F77',
  emerald: '#48B5B5',
  divider: '#DDDFE4',
  purple: '#4F46E5',
  purpleDark: '#4338CA',
  bgLight: '#F4F6F8',
};

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
  display: flex;
  flex-direction: column;
`;

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

  &:hover { background: rgba(255, 255, 255, 0.15); }
`;

const HeaderTitle = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const HeaderSpacer = styled.div`
  width: 32px;
`;

// ─── Stepper ──────────────────────────────────────────────
const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 20px;
  border-bottom: 1px solid ${colors.divider};
`;

const StepLabel = styled.span`
  font-size: 12px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? colors.primary : colors.primaryGray)};
  white-space: nowrap;
`;

// ─── Main content ─────────────────────────────────────────
const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AccountCard = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid ${colors.divider};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AccountCardLabel = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: ${colors.primaryGray};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const AccountName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 20px;
`;

const AccountNumber = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.primaryGray};
  line-height: 18px;
`;

const BankIconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.bgLight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 26px;
`;

// ─── Amount input area ────────────────────────────────────
const AmountInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const AmountDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const CurrencySymbol = styled.span`
  font-size: 36px;
  font-weight: 300;
  color: ${({ hasValue }) => (hasValue ? colors.primary : '#C5CBD2')};
  line-height: 1;
`;

const AmountInput = styled.input`
  font-family: 'Barlow', sans-serif;
  font-size: 48px;
  font-weight: 300;
  color: ${colors.primary};
  border: none;
  outline: none;
  width: ${({ valueLength }) => Math.max(1, valueLength) * 32}px;
  min-width: 48px;
  max-width: 220px;
  text-align: left;
  background: transparent;
  caret-color: ${colors.primary};

  &::placeholder {
    color: #C5CBD2;
  }
`;

const QuickAmounts = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

// ─── Bottom action ────────────────────────────────────────
const BottomBar = styled.div`
  padding: 12px 20px 28px;
  border-top: 1px solid ${colors.divider};
  background: #fff;
`;

// ─── Bank icon SVG ────────────────────────────────────────
function BankIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M3 10H21M5 10V21M19 10V21M12 3L21 10H3L12 3Z"
            stroke="#48B5B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="9" y="14" width="6" height="7" rx="1" stroke="#48B5B5" strokeWidth="1.6"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────
const QUICK_AMOUNTS = [100, 250, 500];

export default function AddFunds() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  const handleQuickAmount = (val) => {
    setAmount(String(val));
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  const numericAmount = parseFloat(amount) || 0;
  const canProceed = numericAmount > 0;

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
          <StepLabel active>Amount</StepLabel>
          <ChevronRight size={14} color="#C5CBD2" />
          <StepLabel>Payment Source</StepLabel>
          <ChevronRight size={14} color="#C5CBD2" />
          <StepLabel>Review</StepLabel>
        </StepperWrapper>

        {/* Content */}
        <Content>

          {/* Account target card */}
          <div>
            <AccountCardLabel>Adding funds to</AccountCardLabel>
            <AccountCard>
              <BankIconCircle>
                <BankIcon />
              </BankIconCircle>
              <div>
                <AccountName>Primary Saving Account</AccountName>
                <AccountNumber>xxxxxxxx012</AccountNumber>
              </div>
            </AccountCard>
          </div>

          {/* Amount section */}
          <SectionTitle>Enter Amount</SectionTitle>

          <AmountInputWrapper>
            <AmountDisplay>
              <CurrencySymbol hasValue={!!amount}>$</CurrencySymbol>
              <AmountInput
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                valueLength={amount.length || 1}
                autoFocus
              />
            </AmountDisplay>

            {/* Quick amount chips */}
            <QuickAmounts>
              {QUICK_AMOUNTS.map((val) => (
                <Tag
                  key={val}
                  label={`$${val}`}
                  active={numericAmount === val}
                  onClick={() => handleQuickAmount(val)}
                />
              ))}
            </QuickAmounts>
          </AmountInputWrapper>

        </Content>

        {/* Bottom action bar */}
        <BottomBar>
          <PrimaryButton disabled={!canProceed}>
            Proceed
          </PrimaryButton>
        </BottomBar>

      </PhoneFrame>
    </PageWrapper>
  );
}
