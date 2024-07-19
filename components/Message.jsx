import "../src/index.css";

const Message = ({ message, type }) => {
  if (message != null) {
    if (type == "error") return <div className="error message">{message}</div>;
    else {
      return <div className="success message">{message}</div>;
    }
  }
};

export default Message;
