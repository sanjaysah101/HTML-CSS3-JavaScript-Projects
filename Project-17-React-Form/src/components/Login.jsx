import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import Input from "./Input";
import useInput from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: hasPasswordError,
  } = useInput("", (value) => hasMinLength(value, 6));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasEmailError || hasPasswordError) return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          autoComplete="username"
          error={hasEmailError ? "Please enter a valid email." : null}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={passwordValue}
          autoComplete="current-password"
          error={hasPasswordError ? "Please enter a valid password." : null}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
