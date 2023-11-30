import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();

  // Fetcher should basically be used whenever you wanna trigger, an action, or also a loader with help of the load function without actually navigating to the page to which the loader belongs or the page to which action belongs.
  //By Using Form provided by react-router-dom; after submitting the form it will forward to the events page after submitting this.

  // ere, we are rendering this component in two places; one in header for all routes or all pages and another in newsletter page. if we use Form component then in newsletter page, there will be no issue since the action to handle the submit action belongs to the same page. It will navigate to the the same page. But in case of submitting form from other component it will navigate to newsletter page.

  // for example: if we enter email and hit enter from the header component of events page or from other route, we will be navigate to newsletter page because the action used to handle this defined in the newsletter route.

  // We can use useFetcher when we want to send request behind teh scenes without triggering any route change

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
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
