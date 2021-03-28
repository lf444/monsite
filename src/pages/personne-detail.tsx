import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import Loader from "../components/loader";
import formatDate from "../helpers/format-date";
import Personne from "../models/personne";
import PersonneService from '../services/personne-service';

type Params = { id: string };

const PersonnesDetail: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [personne, setPersonne] = useState<Personne | null>(null);

  useEffect(() => {
    PersonneService.getPersonne(+match.params.id).then(personne => setPersonne(personne));
  }, [match.params.id]);

  return (
    <div>
      {personne ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center">{personne.nom}</h2>
            <div className="card hoverable">
              <Link
                to={`/personnes/edit/${personne.id}`}
                className="btn btn-floating halfaway-fab waves-effect waves-light"
              >
                <i className="material-icons"> EDITER</i>
              </Link>

              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr>
                        <td>Nom</td>
                        <td>
                          <strong>{personne.nom}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Prenom</td>
                        <td>
                          <strong>{personne.prenom}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Ville</td>
                        <td>
                          <strong>{personne.ville}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Ennemies</td>
                        <td>
                          {personne.ennemies.map((ennemie) => (
                            <span key={ennemie}>{ennemie}</span>
                          ))}
                        </td>
                      </tr>

                      <tr>
                        <td>Date de création</td>
                        <td>{formatDate(personne.dateDeNaissance)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
};
export default PersonnesDetail;
