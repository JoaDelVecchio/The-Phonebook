import { useState, useEffect } from "react";
import Persons from "../components/Persons";
import FilterSearchBar from "../components/FilterSearchBar";
import Form from "../components/Form";
import personsService from "./services/persons";
import Message from "../components/Message";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewData = (event) => {
    event.preventDefault();
    if (isRepeated(newName)) {
      // Ask user to confirm phone number replacement if the name already exists
      if (
        window.confirm(
          `${newName} is already on the list. Do you want to replace the phone number?`
        )
      ) {
        // Find the person to be updated
        let personToBeUpdated = persons.find(
          (person) => person.name == newName
        );
        const personUpdated = {
          id: personToBeUpdated.id,
          name: personToBeUpdated.name,
          phone: newPhone,
        };

        // Update the person's phone number
        personsService
          .update(personToBeUpdated.id, personUpdated)
          .then((personUpdated) =>
            // Replace the old entry with the updated one
            setPersons(
              persons
                .filter((person) => person.name != newName)
                .concat(personUpdated)
            )
          );
        setSuccessMessage(
          `${personUpdated.name} phone number updated to ${personUpdated.phone}`
        );
      }
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1 + "", // Generate a new ID based on the length of the list
      };

      // Add the new person to the list
      personsService.create(newPerson).then((newPerson) => {
        setPersons([...persons, newPerson]);
      });

      setSuccessMessage(`Added ${newPerson.name}`);
    }
    // Reset input fields
    setNewName("");
    setNewPhone("");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };

  // Check if a person with the given name already exists in the list
  const isRepeated = (newName) => {
    return !(persons.find((person) => person.name === newName) === undefined);
  };

  // Fetch all persons data when the component mounts
  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={successMessage} type="success" />
      <Message message={errorMessage} type="error" />
      <FilterSearchBar filter={newFilter} handleFilter={handleNewFilter} />
      <Form
        handleNewData={handleNewData}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <table>
        <tbody>
          <Persons
            persons={persons}
            filter={newFilter}
            setPersons={setPersons}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </tbody>
      </table>
    </div>
  );
};

export default App;
