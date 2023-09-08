import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonIconProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonIcon: React.FC<IButtonIconProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <ButtonWrapper
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </ButtonWrapper>
  );
};

export default ButtonIcon;

const ButtonWrapper = styled.button`
  border: none !important;
  background-color: transparent;
  padding: 3px;
  font-size: 1.75rem;
`;
