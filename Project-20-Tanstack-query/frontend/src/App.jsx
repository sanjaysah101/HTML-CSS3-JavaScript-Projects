import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";

import { queryClient } from "./util/http";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
