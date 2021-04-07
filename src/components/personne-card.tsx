import { FunctionComponent, useState } from "react";
import Personne from "../models/personne";
import "./personne-card.css";
import { useHistory } from "react-router-dom";
import PrinterComponent from "./printer-component";


type Props = {
  personne: Personne;
  borderColor?: string;
};

const PersonneCard: FunctionComponent<Props> = ({
  personne,
  borderColor = "#009688",
}) => {
  const [color, setColor] = useState<string>();

  const history = useHistory();
  // eslint-disable-next-line
  const showBorder = () => {
    setColor(borderColor);
  };
  // eslint-disable-next-line
  const hideBorder = () => {
    setColor("#f5f5f5");
  };
  // eslint-disable-next-line
  const goToPersonne = (id: number) => {
    history.push(`/personnes/${id}`);
  };
  // eslint-disable-next-line
  

  return (
    <div>
          <PrinterComponent personne={personne}/> 
    </div>
  );
};

export default PersonneCard;

