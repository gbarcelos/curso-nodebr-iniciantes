class NotImplementedException extends Error {
    constructor() {
        super('Not Implemented Exception');
    }
}

class ICrud {

    create(item) {
        throw new NotImplementedException();
    }

    read(item) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }

    isConnected(id) {
        throw new NotImplementedException();
    }
}

class MongoDBStrategy extends ICrud {

    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em MongoDB');
    }
}

class PostgresStrategy extends ICrud {

    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em Postgres');
    }
}

class ContextStrategy {

    constructor(database) {
        this._database = database;
    }

    isConnected() {
        return this._database.isConnected();
    }

    create(item) {
        return this._database.create(item);
    }

    read(item) {
        return this._database.read(item);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }
}

const contextMongo = new ContextStrategy(new MongoDBStrategy());

contextMongo.create();

const contexPost = new ContextStrategy(new PostgresStrategy());

contexPost.create();