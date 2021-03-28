import Personne from './personne';

export const PERSONNES: Personne[]=[
{
     id: 1,
     nom: "BALKANY",
     prenom: "Patrick",
     dateDeNaissance: new Date(),
     ville: "Paris",
     ennemies:[""],
},
{
    id: 2,
    nom: "WAYNE",
    prenom: "Bruce",
    dateDeNaissance: new Date(),
    ville: "Gotham",
    ennemies:["Chacal"],
},
{
    id: 3,
    nom: "JOKER",
    prenom: "Joker",
    dateDeNaissance: new Date(),
    ville: "Gotham",
    ennemies:[],
},
{
    id: 4,
    nom: "DONQUICHOTTE ",
    prenom: "Doflamingo",
    dateDeNaissance: new Date(),
    ville: "Venise",
    ennemies:["Boomerang"],
},
{
    id: 5,
    nom: "DESCHAMPS",
    prenom: "Didier",
    dateDeNaissance: new Date(),
    ville: "Paris",
    ennemies:["Agony"],
}


];



export default PERSONNES;


