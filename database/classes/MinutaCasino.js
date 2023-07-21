export class MinutaCasino {
    constructor(id, periodo = "", url = "", r_usuario) {
        this.id = id
        this.periodo = periodo
        this.url = url
        this.r_usuario = r_usuario ? r_usuario : id
    }

    consultar() {}

    registrar() {

        let query = `INSERT INTO MINUTA_CASINO ( PERIODO, URL, R_USUARIO) VALUES`
        query += `('${this.periodo}'`
        query += `,'${this.url}'`
        query += `,'${this.r_usuario ? this.r_usuario : this.id}'`
        query += `);`

        return query

    }

    actualizar() {}

    eliminar() {}

    siExisteURL() {
        let query = `SELECT COUNT(1) FROM MINUTA_CASINO `
        query += `WHERE URL = '${this.url}'`

        return query
    }
}