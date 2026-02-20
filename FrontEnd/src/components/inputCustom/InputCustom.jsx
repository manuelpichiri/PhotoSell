import "./inputCustom.css";

const InputCustom = ({
  text,
  placeholder,
  value,
  onChange,
  type,
  className,
  classNameInput,
  name,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between mb-3 align-items-center ">
        <label className={`label-custom m-0 p-0  ${className}`}>{text}</label>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`input-custom ${classNameInput}`}
          value={value}
          onChange={onChange}
        ></input>
      </div>
    </>
  );
};
export default InputCustom;
