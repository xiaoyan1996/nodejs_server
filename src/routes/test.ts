import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import { userList } from './simulationData';

const app = express();

// type Query 查询使用
// type Mutation 修改数据使用
const Schema = buildSchema(`

    type Account {
        name: String,
        age: Int,
        leave: Boolean
    }

    type User {
        id: String,
        name: String,
        age: Int,
    }

    type Query {
        getName: String,
        getAccount: Account,
        getUserList: [User],
        getUserById(id: String!): User
    } 
`)

// 处理器
const root = {
    getName: () => {
        return 'xiaoke';
    },
    getAccount: () => {
        return {
            name: 'xiaoke',
            age: 20,
            leave: false
        }
    },
    getUserList: () => {
        return userList;
    },
    getUserById: ({id}) => {
        return userList.find(user => user.id === id);
    }
}

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true
}))
 
app.use('/list', (req, res) => {
    res.send('list data');
})


app.listen(3000, () => {
    console.log('start graphql', 'http://localhost:3000');
})
