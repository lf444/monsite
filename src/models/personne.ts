export default class Personne {
   id: number;
   nom: string;
   prenom: string;
   dateDeNaissance: Date;
   ville: string;
   ennemies: Array<string>;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    dateDeNaissance: Date,
    ville: string,
    ennemies:Array<string>=[]
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.dateDeNaissance = dateDeNaissance;
    this.ville = ville;
    this.ennemies=ennemies;
  }

}
