import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();

  /* 
    Fetcher should be used whenever you want to trigger an action or loader using the load function without actually navigating to the page to which the loader or action belongs.

    When using the Form component provided by react-router-dom, after submitting the form, it will forward to the events page. This creates an issue when rendering this component in two places: once in the header for all routes or pages and another on the newsletter page. If we use the Form component, there will be no issue in the newsletter page since the action to handle the submit action belongs to the same page, and it will navigate to the same page. However, when submitting the form from another component, it will navigate to the newsletter page.

    For example, if we enter an email and hit enter from the header component of the events page or another route, we will be navigated to the newsletter page because the action used to handle this is defined in the newsletter route.

    We can use useFetcher when we want to send a request behind the scenes without triggering any route changes.
  */

  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        name="email"
        autoComplete="email"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
