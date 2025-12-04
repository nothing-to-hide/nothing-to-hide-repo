import { FallingPassword } from "../logic/types";

type FallingPasswordProps = {
  password: FallingPassword;
};

export const FallingPasswordComponent = ({ password }: FallingPasswordProps) => {
  return (
    <div
      ref={password.ref}
      className="falling-word glitch-text"
      style={{ left: password.x, top: password.y }}
    >
      {password.value}
    </div>
  );
};
