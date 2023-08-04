export class Usuario {
    constructor(id, first_name = "", username = "", r_usuario) {
        this.id = id;
        this.first_name = first_name;
        this.username = username;
        this.r_usuario = r_usuario ? r_usuario : id;
    }

    consultar() {
        return `SELECT ID, NAME, USUERNAME, R_USUARIO FROM USUARIO WHERE ID = ${this.id}`;
    }

    registrar() {

        let query = `INSERT INTO USUARIO (ID, NAME, USERNAME, R_USUARIO) VALUES`;
        query += `( ${this.id}`;
        query += `,'${this.first_name}'`;
        query += `,'${this.username}'`;
        query += `,'${this.r_usuario ? this.r_usuario : this.id}'`;
        query += `);`;

        return query

    }

    actualizar() {}

    eliminar() {}

    siExiste() {
        let query = `SELECT COUNT(1) FROM USUARIO `;
        query += `WHERE ID = ${this.id}`;

        return query;
    }
}