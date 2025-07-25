import React from "react";
import Images from "./Image";
import Button from "./button/Button";
import { useNavigate } from "react-router-dom";

interface IconProps {
  className?: string;
  buttonClassName?: string;
  size?: string;
  variant?: string;
  to?: string;
  auth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: (e: any) => void;
  loading?: boolean;
  attrIcon?: string;
  image?: boolean;
  style?: React.CSSProperties;
  button?: boolean;
}

const Icon: React.FC<IconProps> = ({
  className = "",
  buttonClassName = "",
  size = "",
  to,
  auth = false,
  disabled = false,
  onClick,
  attrIcon = "",
  image = false,
  style = {},
  button = false,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }
    if (to) {
      e.preventDefault();
      e.stopPropagation();
      navigate(to);
    }
  };

  const IconData = () =>
    image ? (
      <i onClick={handleClick} className={`common_icon_image ${className}`}>
        <Images src={attrIcon} auth={auth} />
      </i>
    ) : (
      <i
        onClick={handleClick}
        style={{ ...style, "--icon-url": `url(${attrIcon})` } as React.CSSProperties}
        className={`common_icon ${className}`}
        attr-icon={attrIcon}
      />
    );

  return button ? (
    <Button
      disabled={disabled}
      onClick={handleClick}
      className={`btn-icon ${buttonClassName} btn-${size}`}
      label={IconData()}
    />
  ) : (
    IconData()
  );
};

export default Icon;