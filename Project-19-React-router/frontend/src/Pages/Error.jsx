import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title;
  let message;

  switch (error.status) {
    case 500:
      title = "An error occurred!";
      message = error.data.message;
      break;
    case 404:
      title = "Not found!";
      message = "Could not find resource or page.";
      break;
    default:
      title = "Unexpected error!";
      message = error.data?.message || "An unexpected error has occurred.";
      break;
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
