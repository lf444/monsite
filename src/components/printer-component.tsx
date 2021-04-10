import { FunctionComponent } from "react";
import "./personne-card.css";
import { jsPDF } from "jspdf";
import { Button } from "@material-ui/core";
import ReactDOMServer from "react-dom/server";


type Props = {
  Template:JSX.Element,
};

const PrinterComponent: FunctionComponent<Props> = ({Template}) => {
 
  const print = (template:JSX.Element): any => {

    
    const test1= ReactDOMServer.renderToStaticMarkup(template);
    const pdf = new jsPDF("p", "mm", "a4");
    const name:string="grossequeue"
    const hauteur = template.key;
    pdf.html(test1, {

        callback: function (pdf) {
         pdf.save(name);
        },
      }); 
    
  };
  return (

    <div>
        <Button onClick={() => print(Template)}>CLIQUER ICI </Button>
    </div>
  
  );
};

export default PrinterComponent;
