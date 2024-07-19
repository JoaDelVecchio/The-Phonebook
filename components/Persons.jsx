import axios from "axios";
import personsService from "../src/services/persons";

const Persons = ({
  persons,
  filter,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const handleDeletion = (id, name) => {
    const person = persons.find((person) => person.id == id);
    // Confirm deletion with the user
    if (window.confirm(`Are you sure you want to delete ${person.name}?`))
      // Remove the person from the server
      personsService
        .remove(id)
        .catch((error) =>
          setErrorMessage(
            `Information of ${name} was already removed from the server.`
          )
        )
        // Update the state to reflect the deletion
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage(
            `Information of ${name} was removed from the server.`
          );
          setTimeout(() => setErrorMessage(null), 5000);
        });
  };

  // Filter the persons list based on the filter string
  if (filter != "") {
    let newPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    persons = newPersons;
  }

  // Render the persons list
  return persons.map((person, index) => (
    <tr key={index}>
      <td>{index + 1}.</td>
      <td>{person.name}</td>
      <td>{person.phone}</td>
      <td>
        <button
          onClick={() => {
            handleDeletion(person.id, person.name);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  ));
};

export default Persons;
