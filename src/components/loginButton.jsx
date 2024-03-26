import { forwardRef } from "react";
import { useButton, Ripple, Spinner } from "@nextui-org/react";
import { text } from "@fortawesome/fontawesome-svg-core";

const loginButton = forwardRef((props, ref) => {
  const {
    domRef,
    children,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
  } = useButton({
    ref,
    ...props,
  });

  const { ripples, onClear } = getRippleProps();

  return (
    <button className="button-78" role="button">
      {text}
    </button>
  );
});

loginButton.displayName = "LoginButton";

export default loginButton;
