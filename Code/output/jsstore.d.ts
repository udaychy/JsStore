declare namespace KeyStore {
    interface IError {
        Name: string;
        Value: string;
    }
    class Utils {
        /**
         * determine and set the DataBase Type
         *
         *
         * @memberOf UtilityLogic
         */
        static setDbType: () => void;
    }
}
declare namespace KeyStore {
    interface ISelect {
        From: any;
        Where: any;
    }
    interface IDelete {
        From: string;
        Where: any;
    }
    enum ConnectionStatus {
        Connected = "connected",
        Closed = "closed",
        NotStarted = "not_connected",
    }
    interface IKeyStoreStatus {
        ConStatus: ConnectionStatus;
        LastError: string;
    }
    interface IInsert {
        TableName: string;
        Set: {
            Key: string;
            Value;
            any;
        };
    }
    interface IWebWorkerRequest {
        Name: string;
        Query: any;
        OnSuccess: (result) => void;
        OnError: (err: IError) => void;
    }
    interface IWebWorkerResult {
        ErrorOccured: boolean;
        ErrorDetails: any;
        ReturnedValue: any;
    }
    var request_queue: IWebWorkerRequest[], table_name: string, is_code_executing: boolean;
}
declare namespace KeyStore {
    var prcoessExecutionOfCode: (request: IWebWorkerRequest) => void;
    var executeCode: () => void;
    var executeCodeDirect: (request: IWebWorkerRequest) => void;
    var processFinishedRequest: (message: IWebWorkerResult) => void;
}
declare namespace KeyStore {
    namespace Business {
        class Base {
            _results: any;
            _onSuccess: (results) => void;
            _onError: (err: IError) => void;
            _errorOccured: boolean;
            _errorCount: number;
            _transaction: IDBTransaction;
            _objectStore: IDBObjectStore;
            protected on_errorOccured: (e: any) => void;
        }
    }
}
declare namespace KeyStore {
    namespace Business {
        class Get extends Base {
            _query: ISelect;
            constructor(query: ISelect, onSuccess: (result) => void, onError: (err: IError) => void);
            private get;
        }
    }
}
declare namespace KeyStore {
    namespace Business {
        class Set extends Base {
            constructor(query: IInsert, onSuccess: () => void, onError: (err: IError) => void);
            private setData;
        }
    }
}
declare namespace KeyStore {
    namespace Business {
        class Remove extends Base {
            _query: IDelete;
            _rowAffected: number;
            constructor(query: IDelete, onSuccess: (recordRemoved: number) => void, onError: (err: IError) => void);
            private remove;
        }
    }
}
declare namespace KeyStore {
    namespace Business {
        class InitDb {
            constructor(dbName: string, tableName: string, onSuccess: () => void, onError: (err: IError) => void);
        }
    }
}
declare namespace KeyStore {
    namespace Business {
        var db_connection: any, status: IKeyStoreStatus;
        class Main {
            _onSuccess: () => void;
            constructor(onSuccess?: any);
            set: (query: IInsert, onSuccess: () => void, onError: (err: IError) => void) => void;
            remove: (query: IDelete, onSuccess: (result: any) => void, onError: (err: IError) => void) => void;
            get: (query: ISelect, onSuccess: (result: any) => void, onError: (err: IError) => void) => void;
            createDb: (tableName: any, onSuccess: () => void, onError: (err: IError) => void) => void;
            checkConnectionAndExecuteLogic: (request: IWebWorkerRequest) => void;
            private returnResult;
            private executeLogic;
        }
    }
}
declare namespace KeyStore {
    /**
     * Initialize KeyStore
     *
     */
    var init: () => void;
    /**
     * return the value by key
     *
     * @param {string} key
     * @param {(result) => void} onSuccess
     * @param {(err: IError) => void} [onError=null]
     * @returns
     */
    var get: (key: string, onSuccess: (result: any) => void, onError?: (err: IError) => void) => any;
    /**
     * insert or update value
     *
     * @param {any} key
     * @param {any} value
     * @param {(result) => void} [onSuccess]
     * @param {(err: IError) => void} [onError]
     * @returns
     */
    var set: (key: any, value: any, onSuccess?: (result: any) => void, onError?: (err: IError) => void) => any;
    /**
     * delete value
     *
     * @param {string} key
     * @param {(result) => void} [onSuccess=null]
     * @param {(err: IError) => void} [onError=null]
     * @returns
     */
    var remove: (key: string, onSuccess?: (result: any) => void, onError?: (err: IError) => void) => any;
}
declare namespace JsStore {
    enum Occurence {
        First = "f",
        Last = "l",
        Any = "a",
    }
    enum WebWorker_Status {
        Registered = "registerd",
        Failed = "failed",
        NotStarted = "not_started",
    }
    enum Connection_Status {
        Connected = "connected",
        Closed = "closed",
        NotStarted = "not_started",
        UnableToStart = "unable_to_start",
    }
    enum WhereQryOption {
        In = "In",
        Like = "Like",
        Or = "Or",
    }
    enum DataType {
        String = "string",
        Object = "object",
        Array = "array",
    }
}
declare namespace JsStore {
    interface IDbInfo {
        DbName: string;
        Table: {
            Name: string;
            Version: number;
        };
    }
    interface IDataBaseOption {
        Name: string;
        Tables: ITableOption[];
    }
    interface ITableOption {
        Name: string;
        Columns: IColumnOption[];
        Version?: number;
    }
    interface IColumnOption {
        Name: string;
        PrimaryKey?: boolean;
        AutoIncrement?: boolean;
        Unique?: boolean;
        NotNull?: boolean;
        DataType?: string;
        Default?: any;
        MultiEntry?: boolean;
    }
    interface ISelect {
        From: any;
        Where: any;
        Skip: number;
        Limit: number;
        OnSuccess: (results: any[]) => void;
        OnError: (error: IError) => void;
        Order: IOrder;
        GroupBy: any;
        Aggregate: {
            Max: any;
            Min: any;
            Count: any;
            Sum: any;
            Avg: any;
        };
        IgnoreCase: boolean;
        Distinct: boolean;
    }
    interface IOrder {
        By: string;
        Type: string;
    }
    interface ICount {
        From: any;
        IgnoreCase: boolean;
        Where: any;
        OnSuccess: (noOfRecord: number) => void;
        OnError: (error: IError) => void;
    }
    interface IRemove {
        From: string;
        IgnoreCase: boolean;
        Where: any;
        OnSuccess: (rowsDeleted: number) => void;
        OnError: (error: IError) => void;
    }
    interface IUpdate {
        In: string;
        IgnoreCase: boolean;
        Set: any;
        Where: any;
        OnSuccess: (rowsUpdated: number) => void;
        OnError: (error: IError) => void;
    }
    interface IInsert {
        Into: string;
        Values: any[];
        Return: boolean;
        OnSuccess: (rowsInserted: number) => void;
        OnError: (error: IError) => void;
        SkipDataCheck: boolean;
    }
    interface ICondition {
        Column: string;
        Value: string;
        Op: string;
    }
    interface ITableJoin {
        Column: string;
        Table: string;
        Where: any;
        Order: IOrder;
        JoinType: string;
        NextJoin: INextJoin;
    }
    interface ISelectJoin {
        From: IJoin;
        Count: boolean;
        Skip: number;
        Limit: number;
        OnSuccess: (results) => void;
        OnError: (err: IError) => void;
    }
    interface IJoin {
        Table1: ITableJoin;
        Join: string;
        Table2: ITableJoin;
    }
    interface INextJoin {
        Table: string;
        Column: string;
    }
    interface IJsStoreStatus {
        ConStatus: Connection_Status;
        LastError: Error_Type;
    }
    interface IWebWorkerRequest {
        Name: string;
        Query: any;
        OnSuccess: (results) => void;
        OnError: (err: IError) => void;
    }
    interface IWebWorkerResult {
        ErrorOccured: boolean;
        ErrorDetails: any;
        ReturnedValue: any;
        ThrowError: boolean;
    }
    interface IAggregate {
        Max: any[];
        Min: any[];
        Sum: any[];
        Count: any[];
        Avg: any[];
    }
    interface ITranscationQry {
        TableNames: string[];
        Logic: string;
        Data: any;
        AbortOnError: boolean;
        OnSuccess: (results: any[]) => void;
        OnError: (err: IError) => void;
    }
}
declare namespace JsStore {
    var enable_log: boolean, db_version: number, status: IJsStoreStatus, file_name: any;
    var setFileName: (fileName: any) => void;
    var getObjectFirstKey: (value: any) => string;
    var log: (msg: any) => void;
    var logError: (msg: any) => void;
}
declare namespace JsStore {
    class Utils {
        static convertObjectintoLowerCase(obj: any): void;
    }
}
declare namespace JsStore {
    /**
     * checks whether db exist or not
     *
     * @param {DbInfo} dbInfo
     * @param {() => void} [callback=null]
     * @param {() => void} [errCallBack=null]
     * @returns
     */
    var isDbExist: (dbInfo: IDbInfo, callback?: (isExist: boolean) => void, errCallBack?: (err: IError) => void) => any;
    /**
     * get Db Version
     *
     * @param {string} dbName
     * @param {(version: number) => void} callback
     */
    var getDbVersion: (dbName: string, callback: (version: number) => void) => void;
    /**
     * get Database Schema
     *
     * @param {string} dbName
     * @param {(any) => void} callback
     */
    var getDbSchema: (dbName: string, callback: (any: any) => void) => void;
    /**
     * check for null value
     *
     * @param {any} value
     * @returns
     */
    var isNull: (value: any) => boolean;
    /**
     * Enable log
     *
     */
    var enableLog: () => void;
    /**
     * disable log
     *
     */
    var disableLog: () => void;
}
declare namespace JsStore {
    enum Error_Type {
        UndefinedColumn = "undefined_column",
        UndefinedValue = "undefined_value",
        UndefinedColumnName = "undefined_column_name",
        UndefinedDbName = "undefined_database_name",
        UndefinedColumnValue = "undefined_column_value",
        NotArray = "not_array",
        NoValueSupplied = "no_value_supplied",
        ColumnNotExist = "column_not_exist",
        InvalidOp = "invalid_operator",
        NullValue = "null_value",
        BadDataType = "bad_data_type",
        NextJoinNotExist = "next_join_not_exist",
        TableNotExist = "table_not_exist",
        DbNotExist = "db_not_exist",
        IndexedDbUndefined = "indexeddb_undefined",
        IndexedDbBlocked = "indexeddb_blocked",
        ConnectionAborted = "connection_aborted",
        ConnectionClosed = "connection_closed",
        NotObject = "not_object",
    }
    interface IError {
        _type: Error_Type;
        _message: string;
    }
    class Error implements IError {
        _type: Error_Type;
        _message: string;
        private _info;
        constructor(type: Error_Type, info?: any);
        throw: () => never;
        logError: () => void;
        logWarning: () => void;
        get(): IError;
        private getMsg;
    }
}
declare namespace JsStore {
    namespace Model {
        class Column {
            _name: string;
            _autoIncrement: boolean;
            _primaryKey: boolean;
            _unique: boolean;
            _notNull: boolean;
            _dataType: string;
            _default: any;
            _multiEntry: boolean;
            _advTextSearch: boolean;
            constructor(key: IColumnOption, tableName: string);
        }
    }
}
declare namespace JsStore {
    namespace Model {
        class Table {
            _name: string;
            _columns: Column[];
            _version: number;
            _primaryKey: string;
            constructor(table: ITableOption);
        }
    }
}
declare namespace JsStore {
    namespace Model {
        class TableHelper {
            _name: string;
            _columns: Column[];
            _primaryKey: string;
            _version: number;
            _requireDelete: boolean;
            _requireCreation: boolean;
            _callback: () => void;
            constructor(table: Table);
            createMetaData: (dbName: string, callBack: () => void) => void;
            private setPrimaryKey();
            private setRequireDelete(dbName);
            private setDbVersion(dbName);
        }
    }
}
declare namespace JsStore {
    namespace Model {
        class DbHelper {
            _name: string;
            _tables: Table[];
            constructor(dataBase: DataBase);
            createMetaData: (callBack: (tablesMetaData: TableHelper[]) => void) => void;
        }
    }
}
declare namespace JsStore {
    namespace Model {
        class DataBase {
            _name: string;
            _tables: Table[];
            constructor(dataBase: IDataBaseOption);
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class BaseHelper {
            protected filterOnOccurence: (value: any) => boolean;
            protected isTableExist: (tableName: string) => boolean;
            protected getTable: (tableName: string) => Table;
            protected getKeyRange: (value: any, op: any) => IDBKeyRange;
            protected getObjectSecondKey: (value: any) => string;
            protected getPrimaryKey: (tableName: any) => any;
            protected getKeyPath: (tableName: any) => string | string[];
            protected sortNumberInAsc: (values: any) => any;
            protected sortNumberInDesc: (values: any) => any;
            protected sortAlphabetInAsc: (values: any) => any;
            protected sortAlphabetInDesc: (values: any) => any;
            protected getAllCombinationOfWord(word: any, isArray: any): any[];
            private getCombination(word);
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class Base extends BaseHelper {
            _error: IError;
            _errorOccured: boolean;
            _errorCount: number;
            _rowAffected: number;
            _onSuccess: (result?) => void;
            _onError: (err: IError) => void;
            _objectStore: IDBObjectStore;
            _query: any;
            _whereChecker: WhereChecker;
            _tableName: string;
            _isTransaction: boolean;
            protected onErrorOccured: (e: any, customError?: boolean) => void;
            protected onExceptionOccured: (ex: DOMException, info: any) => void;
            protected goToWhereLogic: () => void;
            protected makeQryInCaseSensitive: (qry: any) => any;
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class CreateDb {
            constructor(tablesMetaData: Model.TableHelper[], onSuccess: (listOf) => void, onError: (err: IError) => void);
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class DropDb {
            constructor(name: string, onSuccess: () => void, onError: (err: IError) => void);
            deleteDb(name: string, onSuccess: () => void, onError: (err: any) => void): void;
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class BulkInsert extends Base {
            _query: IInsert;
            constructor(query: IInsert, onSuccess: () => void, onError: (err: IError) => void);
            execute(): void;
            private bulkinsertData();
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class OpenDb {
            constructor(dbVersion: any, onSuccess: () => void, onError: (err: IError) => void);
            private setPrimaryKey;
        }
    }
}
declare namespace JsStore {
    namespace Business {
        class Clear extends Base {
            constructor(tableName: string, onSuccess: () => void, onError: (err: IError) => void);
        }
    }
}
declare namespace JsStore {
    namespace Business {
        var db_connection: IDBDatabase, active_db: DataBase, db_transaction: IDBTransaction, createTransaction: (tableNames: any, callBack: () => void, mode?: any) => void;
        class Main {
            _onSuccess: (result) => void;
            constructor(onSuccess?: any);
            checkConnectionAndExecuteLogic(request: IWebWorkerRequest): void;
            private changeLogStatus(request);
            private returnResult(result);
            private executeLogic(request);
            private transaction(qry, onSuccess, onError);
            private openDb(dbName, onSuccess, onError);
            private closeDb();
            private dropDb(onSuccess, onError);
            private update(query, onSuccess, onError);
            private insert(query, onSuccess, onError);
            private bulkInsert(query, onSuccess, onError);
            private remove(query, onSuccess, onError);
            private select(query, onSuccess, onError);
            private count(query, onSuccess, onError);
            private createDb(dataBase, onSuccess, onError);
            private clear(tableName, onSuccess, onError);
            private exportJson(query, onSuccess, onError);
        }
    }
}
declare namespace JsStore {
    namespace Business {
        /**
         * For matching the different column value existance for where option
         *
         * @export
         * @class WhereChecker
         */
        class WhereChecker {
            _where: any;
            _status: any;
            constructor(where: any);
            check: (rowValue: any) => any;
            private checkIn;
            private checkLike;
            private checkComparisionOp;
        }
    }
}
declare var tx_logic: any;
declare namespace JsStore {
    namespace Business {
        class Transaction extends Base {
            _results: any;
            constructor(qry: ITranscationQry, onSuccess: any, onError: any);
            execute(): void;
            private initTransaction(tableNames);
            private onTransactionCompleted();
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class BaseSelect extends Base {
                _results: any[];
                _sorted: boolean;
                _skipRecord: any;
                _limitRecord: any;
                _checkFlag: boolean;
                _isOr: boolean;
                _isArrayQry: boolean;
                _onWhereArrayQrySuccess: () => void;
                protected removeDuplicates(): void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class NotWhere extends BaseSelect {
                protected executeWhereUndefinedLogic: () => void;
                private executeSkipAndLimitForNoWhere;
                private executeSkipForNoWhere;
                private executeSimpleForNotWhere;
                private executeLimitForNotWhere;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class In extends NotWhere {
                protected executeInLogic: (column: any, values: any) => void;
                private executeSkipAndLimitForIn;
                private executeSkipForIn;
                private executeLimitForIn;
                private executeSimpleForIn;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class Like extends In {
                _compSymbol: Occurence;
                _compValue: any;
                _compValueLength: number;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
                private executeSkipAndLimit;
                private executeSkip;
                private executeLimit;
                private executeSimple;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class Where extends Like {
                private executeSkipAndLimitForWhere;
                private executeSkipForWhere;
                private executeLimitForWhere;
                private executeSimpleForWhere;
                private executeWhereLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class Join extends BaseSelect {
                _query: ISelectJoin;
                _queryStack: ITableJoin[];
                _currentQueryStackIndex: number;
                constructor(query: ISelectJoin, onSuccess: (results: any[]) => void, onError: (err: IError) => void);
                private onTransactionCompleted;
                private executeWhereJoinLogic;
                private executeRightJoin;
                private executeWhereUndefinedLogicForJoin;
                private startExecutionJoinLogic();
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class GroupByHelper extends Where {
                constructor();
                protected processGroupBy(): void;
                protected executeAggregateGroupBy(): void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class Helper extends GroupByHelper {
                constructor();
                processOrderBy(): void;
                protected processAggregateQry(): void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Select {
            class Instance extends Helper {
                constructor(query: ISelect, onSuccess: (results: any[]) => void, onError: (err: IError) => void);
                execute(): void;
                private processWhereArrayQry();
                private onQueryFinished();
                private initTransaction();
                private processWhere();
                private onTransactionCompleted();
                private orQueryFinish();
                private orQuerySuccess();
                private processOrLogic();
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Count {
            class BaseCount extends Base {
                _resultCount: number;
                _skipRecord: any;
                _limitRecord: any;
                _checkFlag: boolean;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Count {
            class NotWhere extends BaseCount {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Count {
            class In extends NotWhere {
                private executeInLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Count {
            class Like extends In {
                _compSymbol: Occurence;
                _compValue: any;
                _compValueLength: number;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Count {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Count {
            class Instance extends Where {
                constructor(query: ICount, onSuccess: (noOfRecord: number) => void, onError: (error: IError) => void);
                execute(): void;
                private initTransaction();
                private onQueryFinished();
                private onTransactionCompleted();
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            var updateValue: (suppliedValue: any, storedValue: any) => any;
        }
        class BaseUpdate extends Base {
            _checkFlag: boolean;
            private onQueryFinished;
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            class NotWhere extends BaseUpdate {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            class In extends NotWhere {
                private executeInLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            class Like extends In {
                _compSymbol: Occurence;
                _compValue: any;
                _compValueLength: number;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            class Instance extends Where {
                constructor(query: IUpdate, onSuccess: () => void, onError: (err: IError) => void);
                execute(): void;
                private onTransactionCompleted();
                private initTransaction();
                private executeComplexLogic();
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Update {
            class SchemaChecker {
                _table: Table;
                constructor(table: Table);
                check: (setValue: any, tblName: any) => IError;
                private checkByColumn;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Remove {
            class BaseRemove extends Base {
                _checkFlag: boolean;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Remove {
            class NotWhere extends BaseRemove {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Remove {
            class In extends NotWhere {
                private executeInLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Remove {
            class Like extends In {
                _compSymbol: Occurence;
                _compValue: any;
                _compValueLength: number;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Remove {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Remove {
            class Instance extends Where {
                _isOr: boolean;
                constructor(query: IRemove, onSuccess: (recordRemoved: number) => void, onError: (err: IError) => void);
                execute(): void;
                private processWhereArrayQry();
                private processWhere();
                private initTransaction();
                private onTransactionCompleted();
                private onQueryFinished();
                private orQuerySuccess();
                private processOrLogic();
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Insert {
            class Instance extends Base {
                _valuesAffected: any[];
                _query: IInsert;
                _table: Table;
                constructor(query: IInsert, onSuccess: (rowsInserted: number) => void, onError: (err: IError) => void);
                execute(): void;
                private onTransactionCompleted();
                private onQueryFinished();
                private insertData(values);
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Insert {
            class ValueChecker {
                _table: Table;
                _value: object;
                _errorOccured: boolean;
                _error: IError;
                _autoIncrementValue: {};
                constructor(table: Table, autoIncrementValue: any);
                checkAndModifyValue(value: any): boolean;
                private checkNotNullAndDataType(column);
                private checkAndModifyColumnValue(column);
                private onValidationError(error, details);
            }
        }
    }
}
declare namespace JsStore {
    namespace Business {
        namespace Insert {
            class ValuesChecker {
                _table: Table;
                _values: any[];
                _error: IError;
                _onFinish: (isError: boolean) => void;
                _valueCheckerObj: ValueChecker;
                constructor(table: Table, values: any[]);
                checkAndModifyValues(onFinish: (isError: boolean) => void): void;
                private startChecking();
            }
        }
    }
}
declare var Promise: any;
declare namespace JsStore {
    var worker_status: WebWorker_Status, worker_instance: Worker;
    class CodeExecutionHelper {
        private _requestQueue;
        private _isCodeExecuting;
        protected pushApi(request: IWebWorkerRequest, usePromise: boolean): any;
        protected createWorker(): void;
        private prcoessExecutionOfCode(request);
        private executeCode();
        private executeCodeDirect(request);
        private executeCodeUsingWorker(request);
        private processFinishedRequest(message);
        private onWorkerFailed();
        private getScriptUrl(fileName);
        private onMessageFromWorker(msg);
    }
}
import Model = JsStore.Model;
import DataBase = Model.DataBase;
import Column = Model.Column;
import Table = Model.Table;
declare namespace JsStore {
    class Instance extends CodeExecutionHelper {
        constructor(dbName?: any);
        /**
         * open database
         *
         * @param {string} dbName
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @returns
         * @memberof Instance
         */
        openDb(dbName: string, onSuccess: () => void, onError: (err: IError) => void): any;
        /**
         * creates DataBase
         *
         * @param {Model.IDataBase} dataBase
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @returns
         * @memberof Instance
         */
        createDb(dataBase: IDataBaseOption, onSuccess: (dbSchema: any) => void, onError: (err: IError) => void): any;
        /**
         * drop dataBase
         *
         * @param {Function} onSuccess
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        dropDb(onSuccess: () => void, onError: (err: IError) => void): any;
        /**
         * select data from table
         *
         * @param {IQuery} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         *
         * @memberOf Main
         */
        select(query: ISelect, onSuccess: (results: any[]) => void, onError: (err: IError) => void): any;
        /**
         * perform transaction - execute multiple apis
         *
         * @param {string[]} tableNames
         * @param {any} txLogic
         * @param {(results: any[]) => void} onSuccess
         * @param {(err: IError) => void} onError
         * @returns
         * @memberof Instance
         */
        transaction(query: ITranscationQry, onSuccess: (results: any[]) => void, onError: (err: IError) => void): any;
        /**
         * get no of result from table
         *
         * @param {ICount} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        count(query: ICount, onSuccess: (noOfRecord: number) => void, onError: (err: IError) => void): any;
        /**
         * insert data into table
         *
         * @param {IInsert} query
         * @param {(recordInserted: number) => void} onSuccess
         * @param {(err: IError) => void} onError
         * @returns
         * @memberof Instance
         */
        insert(query: IInsert, onSuccess: (recordInserted: number) => void, onError: (err: IError) => void): any;
        /**
         * update data into table
         *
         * @param {IUpdate} query
         * @param {(recordUpdated: number) => void} onSuccess
         * @param {(err: IError) => void} onError
         * @returns
         * @memberof Instance
         */
        update(query: IUpdate, onSuccess: (recordUpdated: number) => void, onError: (err: IError) => void): any;
        delete(query: IRemove, onSuccess: (recordDeleted: number) => void, onError: (err: IError) => void): void;
        /**
         * remove data from table
         *
         * @param {IRemove} query
         * @param {(recordDeleted: number) => void} onSuccess
         * @param {(err: IError) => void} onError
         * @returns
         * @memberof Instance
         */
        remove(query: IRemove, onSuccess: (recordDeleted: number) => void, onError: (err: IError) => void): any;
        /**
         * delete all data from table
         *
         * @param {string} tableName
         * @param {() => void} onSuccess
         * @param {(err: IError) => void} onError
         * @returns
         * @memberof Instance
         */
        clear(tableName: string, onSuccess: () => void, onError: (err: IError) => void): any;
        /**
         * insert bulk amount of data
         *
         * @param {IInsert} query
         * @param {() => void} onSuccess
         * @param {(err: IError) => void} onError
         * @returns
         * @memberof Instance
         */
        bulkInsert(query: IInsert, onSuccess: () => void, onError: (err: IError) => void): any;
        /**
         * export the result in json file
         *
         * @param {ISelect} qry
         * @memberof Instance
         */
        exportJson(query: ISelect): any;
    }
}
