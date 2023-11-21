import CoreConcepts from "./components/coreConcept/CoreConcepts";
import Examples from "./components/examples/Examples";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
