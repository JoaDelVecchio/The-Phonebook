import "../src/index.css";

const ErrorMessage = ({ message }) => {
  if (message != "") {
    return <div className="error message">{message}</div>;
  }
};

export default ErrorMessage;
