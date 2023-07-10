

import DbConnection from "../../../db/config";
import { Model } from 'objection';

Model.knex(DbConnection.getInstance().getConnection());

export interface UserAttributes {
    id?: number;
    email: string
    name: string;
    password: string;
    type_user: number;
}

class Users extends Model {
    static get tableName() {
        return 'users';
    }
    // async $beforeInsert(queryContext) {
    //     await super.$beforeInsert(queryContext);
    //     await this.doPossiblyAsyncStuff();
    //   }
}



// User.beforeCreate(async (user) => {
//     const hashedPassword = await bcrypt.hashSync(user.password, 10);
//     user.password = hashedPassword;
// });


export default Users;