const Form = ({
  handleNewData,
  handleNewName,
  handleNewPhone,
  newName,
  newPhone,
}) => (
  <form onSubmit={handleNewData}>
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" value={newName} onChange={handleNewName} />
    </div>
    <div>
      <label htmlFor="phone">Phone numbers:</label>
      <input
        id="phone"
        name="phone"
        value={newPhone}
        onChange={handleNewPhone}
      />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
);

export default Form;
