import knex, { Knex } from 'knex';

const dbName = "cras-db"
const dbUser = "root"
const dbHost = "localhost"
const dbPassword = "root"

class DbConnection {
    private static _instance?: any;
    private localConnection?: Knex;


    private constructor() {
        this.localConnection = knex(
            {
                client: "mysql",
                connection: {
                    host: dbHost,
                    user: dbUser,
                    password: dbPassword,
                    database: dbName
                }
            }
        )
    }

    static getInstance() {
        if (!DbConnection._instance) {
          DbConnection._instance = new DbConnection();
        }
        return this._instance;
    }

    setConnection(dbName: string) {
        this.localConnection = knex({
          client: 'mysql',
          connection: {
            host: dbHost,
            user: dbUser,
            password: dbPassword,
            database: dbName
          }
        })
        return this.localConnection!;
      }
    
      getConnection() {
        return this.localConnection!;
      }
}


export default DbConnection;