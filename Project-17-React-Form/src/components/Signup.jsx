import { useState } from "react";
import Input from "./Input";
import CheckBox from "./CheckBox";

export default function Signup() {
  const [arePasswordsEqual, setArePasswordsEqual] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisitionChannel = acquisitionChannel;

    if (data.password != data["confirm-password"]) {
      setArePasswordsEqual(true);
      return;
    }

    // Send form data to server....

    // Reset Form after submitting
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <Input label="Email" id="email" type="email" name="email" autoComplete="username" required />

      <div className="control-row">
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={6}
        />

        <Input
          label="Confirm Password"
          id="confirm-password"
          type="password"
          name="confirm-password"
          autoComplete="new-password"
          required
          error={arePasswordsEqual ? "Passwords must match" : null}
        />
      </div>

      <hr />

      <div className="control-row">
        <Input
          label="First Name"
          type="text"
          id="first-name"
          name="first-name"
          required
        />

        <Input
          label="Last Name"
          type="text"
          id="last-name"
          name="last-name"
          required
        />
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <CheckBox
          label="Google"
          id="google"
          name="acquisition"
          value="google"
        />

        <CheckBox
          id="friend"
          label="Referred by fried"
          name="acquisition"
          value="friend"
        />

        <CheckBox label="Other" id="other" name="acquisition" value="other" />
      </fieldset>

      <CheckBox
        label=" I agree to the terms and conditions"
        id="terms-and-conditions"
        name="terms"
        required
      />

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
