import './TypeTag.css';

type TypeTagProps = {
  type: string;
};

const TypeTag = ({ type }: TypeTagProps) => {
  return (
    <span className={`type-tag ${type}`}>{type}</span>
  );
}

export default TypeTag;