import { useHistory } from "react-router";

interface Props {
    className?:string
}
export const Retour : React.FC<Props> = ({className}) => {
  const history = useHistory();
  const retour = () => {
    history.goBack();
  };
  return (
    <>
      <div className={"d-inline-block px-0 mb-2 " +className}>
        <div
          className="btn btn-sm bg-primary-light text-primary"
          onClick={retour}
        >
          Retour
        </div>
      </div>
    </>
  );
};
