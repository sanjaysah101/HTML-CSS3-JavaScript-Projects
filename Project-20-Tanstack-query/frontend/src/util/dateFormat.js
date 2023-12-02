export const dateFormat = (date) =>
  new Date(date).toLocaleDateString("en-Us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
