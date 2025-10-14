import './InputField.css';

const InputField = ({ id, label, type, icon, value, onChange, onKeyPress, placeholder }) => {
  return (
    <div className="input-field">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <div className="input-icon">
          <span>{icon}</span>
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          className="input-control"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;