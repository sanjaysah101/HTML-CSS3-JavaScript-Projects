import { useRef, useState, useEffect } from "react";

import { AVAILABLE_PLACES } from "./data.js";
import { sortPlacesByDistanceFromReference } from "./distanceCalculator.js";

import Places from "./components/Places";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Header from "./components/Header";

const storedPlaceIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedPlaceIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const sortedPlace = sortPlacesByDistanceFromReference(
          AVAILABLE_PLACES,
          latitude,
          longitude
        );
        setAvailablePlaces(sortedPlace);
      }
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemovePlace();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  function handleStartRemovePlace(id) {
    modal.current.open();
    setIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedPlaceIds =
      JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    if (!storedPlaceIds.includes(id)) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedPlaceIds])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
    setIsOpen(false);

    const storedPlaceIds =
      JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    if (storedPlaceIds.includes(selectedPlace.current)) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(
          storedPlaceIds.filter(
            (storedPlaceId) => storedPlaceId !== selectedPlace.current
          )
        )
      );
    }
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <Header />

      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText="Sorting places by distance..."
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
