//CLASSE
export default class Report {
    // Propriétés
    constructor(company, date, comment = "Pas d'observations") { 
        this.id = new Date().getTime();
        this.company = company;
        this.date = date;
        this.comment = comment;
    }

};