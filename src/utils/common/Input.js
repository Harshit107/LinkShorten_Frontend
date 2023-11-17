import "./Input.css";

const Input = (props) => {
  
  return (
    <div className={`inputContainer ${props.data}`}>
      <label htmlFor={props.id} className="label">{props.label}</label>
      <input {...props} className={`input ${props.className}`}/>
    </div>
  );
};

export default Input;
