import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button type="button" className="counter" onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
