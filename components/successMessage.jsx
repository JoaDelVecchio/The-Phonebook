import "../src/index.css";

const SuccessMessage = ({ message }) => {
  if (message != "") {
    return <div className="success">{message}</div>;
  }
};

export default SuccessMessage;
