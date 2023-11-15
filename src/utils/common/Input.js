import "./Input.css";

const Input = (props) => {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.id}
        placeholder={props.placeholder}
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={(e) => props.onValueChanged(e.target.value)}
      ></input>
    </>
  );
};

export default Input;
