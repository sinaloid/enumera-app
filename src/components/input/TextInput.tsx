interface ContainerProps {
  children?: any;
  props?: any;
  label?: any;
  icon?: any;
}

const TextInput: React.FC<ContainerProps> = ({
  children,
  props,
  label,
  icon,
}) => {
  if (icon) {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">
          {icon}
        </span>
        <input
          {...props}
          type="text"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
        />
      </div>
    );
  } else {
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {label}
      </label>
      <input type="text" {...props} className="form-control" />
    </div>;
  }
};

export default TextInput;
