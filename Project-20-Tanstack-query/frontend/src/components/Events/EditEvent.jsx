import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal";
import LoadingIndicator from "../UI/LoadingIndicator";
import EventForm from "./EventForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const { mutate } = useMutation({
    // Specify the function to be called for the mutation
    mutationFn: updateEvent,

    // Define actions to be performed before the mutation is applied
    onMutate: async (data) => {
      const newEvent = data.event;

      // Cancel any ongoing queries related to the specific event
      await queryClient.cancelQueries({ queryKey: ["events", id] });

      // Store the previous data of the event before the mutation
      const previousEvent = queryClient.getQueriesData(["events", id]);

      // Set the new event data in the cache for optimistic updates
      queryClient.setQueriesData(["events", id], newEvent);

      // Return an object with the previous event data for potential use in onSettled or onError
      return { previousEvent };
    },

    // Define actions to be performed on error during the mutation
    onError: (error, data, context) => {
      // Rollback to the previous event data in case of an error
      queryClient.setQueriesData(["events", id], context.previousEvent);
    },

    // Define actions to be performed once the mutation is settled (succeeded or failed)
    onSettled: () => {
      // Invalidate the query for the specific event to trigger a refetch
      queryClient.invalidateQueries(["events", id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal>{content}</Modal>;
}
