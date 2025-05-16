
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model medicine
 * 
 */
export type medicine = $Result.DefaultSelection<Prisma.$medicinePayload>
/**
 * Model prescription
 * 
 */
export type prescription = $Result.DefaultSelection<Prisma.$prescriptionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Medicines
 * const medicines = await prisma.medicine.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Medicines
   * const medicines = await prisma.medicine.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.medicine`: Exposes CRUD operations for the **medicine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medicines
    * const medicines = await prisma.medicine.findMany()
    * ```
    */
  get medicine(): Prisma.medicineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prescription`: Exposes CRUD operations for the **prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.prescriptionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    medicine: 'medicine',
    prescription: 'prescription'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "medicine" | "prescription"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      medicine: {
        payload: Prisma.$medicinePayload<ExtArgs>
        fields: Prisma.medicineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.medicineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.medicineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>
          }
          findFirst: {
            args: Prisma.medicineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.medicineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>
          }
          findMany: {
            args: Prisma.medicineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>[]
          }
          create: {
            args: Prisma.medicineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>
          }
          createMany: {
            args: Prisma.medicineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.medicineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>
          }
          update: {
            args: Prisma.medicineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>
          }
          deleteMany: {
            args: Prisma.medicineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.medicineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.medicineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicinePayload>
          }
          aggregate: {
            args: Prisma.MedicineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicine>
          }
          groupBy: {
            args: Prisma.medicineGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicineGroupByOutputType>[]
          }
          count: {
            args: Prisma.medicineCountArgs<ExtArgs>
            result: $Utils.Optional<MedicineCountAggregateOutputType> | number
          }
        }
      }
      prescription: {
        payload: Prisma.$prescriptionPayload<ExtArgs>
        fields: Prisma.prescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.prescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.prescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>
          }
          findFirst: {
            args: Prisma.prescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.prescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>
          }
          findMany: {
            args: Prisma.prescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>[]
          }
          create: {
            args: Prisma.prescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>
          }
          createMany: {
            args: Prisma.prescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.prescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>
          }
          update: {
            args: Prisma.prescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>
          }
          deleteMany: {
            args: Prisma.prescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.prescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.prescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.prescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.prescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    medicine?: medicineOmit
    prescription?: prescriptionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PrescriptionCountOutputType
   */

  export type PrescriptionCountOutputType = {
    medicine: number
  }

  export type PrescriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicine?: boolean | PrescriptionCountOutputTypeCountMedicineArgs
  }

  // Custom InputTypes
  /**
   * PrescriptionCountOutputType without action
   */
  export type PrescriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrescriptionCountOutputType
     */
    select?: PrescriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PrescriptionCountOutputType without action
   */
  export type PrescriptionCountOutputTypeCountMedicineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: medicineWhereInput
  }


  /**
   * Models
   */

  /**
   * Model medicine
   */

  export type AggregateMedicine = {
    _count: MedicineCountAggregateOutputType | null
    _avg: MedicineAvgAggregateOutputType | null
    _sum: MedicineSumAggregateOutputType | null
    _min: MedicineMinAggregateOutputType | null
    _max: MedicineMaxAggregateOutputType | null
  }

  export type MedicineAvgAggregateOutputType = {
    id: number | null
    prescriptionId: number | null
  }

  export type MedicineSumAggregateOutputType = {
    id: number | null
    prescriptionId: number | null
  }

  export type MedicineMinAggregateOutputType = {
    id: number | null
    name: string | null
    morning: string | null
    afternoon: string | null
    evening: string | null
    night: string | null
    quantity: string | null
    instructions: string | null
    prescriptionId: number | null
  }

  export type MedicineMaxAggregateOutputType = {
    id: number | null
    name: string | null
    morning: string | null
    afternoon: string | null
    evening: string | null
    night: string | null
    quantity: string | null
    instructions: string | null
    prescriptionId: number | null
  }

  export type MedicineCountAggregateOutputType = {
    id: number
    name: number
    morning: number
    afternoon: number
    evening: number
    night: number
    quantity: number
    instructions: number
    prescriptionId: number
    _all: number
  }


  export type MedicineAvgAggregateInputType = {
    id?: true
    prescriptionId?: true
  }

  export type MedicineSumAggregateInputType = {
    id?: true
    prescriptionId?: true
  }

  export type MedicineMinAggregateInputType = {
    id?: true
    name?: true
    morning?: true
    afternoon?: true
    evening?: true
    night?: true
    quantity?: true
    instructions?: true
    prescriptionId?: true
  }

  export type MedicineMaxAggregateInputType = {
    id?: true
    name?: true
    morning?: true
    afternoon?: true
    evening?: true
    night?: true
    quantity?: true
    instructions?: true
    prescriptionId?: true
  }

  export type MedicineCountAggregateInputType = {
    id?: true
    name?: true
    morning?: true
    afternoon?: true
    evening?: true
    night?: true
    quantity?: true
    instructions?: true
    prescriptionId?: true
    _all?: true
  }

  export type MedicineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which medicine to aggregate.
     */
    where?: medicineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicines to fetch.
     */
    orderBy?: medicineOrderByWithRelationInput | medicineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: medicineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned medicines
    **/
    _count?: true | MedicineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicineMaxAggregateInputType
  }

  export type GetMedicineAggregateType<T extends MedicineAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicine[P]>
      : GetScalarType<T[P], AggregateMedicine[P]>
  }




  export type medicineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: medicineWhereInput
    orderBy?: medicineOrderByWithAggregationInput | medicineOrderByWithAggregationInput[]
    by: MedicineScalarFieldEnum[] | MedicineScalarFieldEnum
    having?: medicineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicineCountAggregateInputType | true
    _avg?: MedicineAvgAggregateInputType
    _sum?: MedicineSumAggregateInputType
    _min?: MedicineMinAggregateInputType
    _max?: MedicineMaxAggregateInputType
  }

  export type MedicineGroupByOutputType = {
    id: number
    name: string
    morning: string | null
    afternoon: string | null
    evening: string | null
    night: string | null
    quantity: string
    instructions: string
    prescriptionId: number
    _count: MedicineCountAggregateOutputType | null
    _avg: MedicineAvgAggregateOutputType | null
    _sum: MedicineSumAggregateOutputType | null
    _min: MedicineMinAggregateOutputType | null
    _max: MedicineMaxAggregateOutputType | null
  }

  type GetMedicineGroupByPayload<T extends medicineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicineGroupByOutputType[P]>
            : GetScalarType<T[P], MedicineGroupByOutputType[P]>
        }
      >
    >


  export type medicineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    morning?: boolean
    afternoon?: boolean
    evening?: boolean
    night?: boolean
    quantity?: boolean
    instructions?: boolean
    prescriptionId?: boolean
    prescription?: boolean | prescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicine"]>



  export type medicineSelectScalar = {
    id?: boolean
    name?: boolean
    morning?: boolean
    afternoon?: boolean
    evening?: boolean
    night?: boolean
    quantity?: boolean
    instructions?: boolean
    prescriptionId?: boolean
  }

  export type medicineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "morning" | "afternoon" | "evening" | "night" | "quantity" | "instructions" | "prescriptionId", ExtArgs["result"]["medicine"]>
  export type medicineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | prescriptionDefaultArgs<ExtArgs>
  }

  export type $medicinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "medicine"
    objects: {
      prescription: Prisma.$prescriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      morning: string | null
      afternoon: string | null
      evening: string | null
      night: string | null
      quantity: string
      instructions: string
      prescriptionId: number
    }, ExtArgs["result"]["medicine"]>
    composites: {}
  }

  type medicineGetPayload<S extends boolean | null | undefined | medicineDefaultArgs> = $Result.GetResult<Prisma.$medicinePayload, S>

  type medicineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<medicineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicineCountAggregateInputType | true
    }

  export interface medicineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['medicine'], meta: { name: 'medicine' } }
    /**
     * Find zero or one Medicine that matches the filter.
     * @param {medicineFindUniqueArgs} args - Arguments to find a Medicine
     * @example
     * // Get one Medicine
     * const medicine = await prisma.medicine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends medicineFindUniqueArgs>(args: SelectSubset<T, medicineFindUniqueArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medicine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {medicineFindUniqueOrThrowArgs} args - Arguments to find a Medicine
     * @example
     * // Get one Medicine
     * const medicine = await prisma.medicine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends medicineFindUniqueOrThrowArgs>(args: SelectSubset<T, medicineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicineFindFirstArgs} args - Arguments to find a Medicine
     * @example
     * // Get one Medicine
     * const medicine = await prisma.medicine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends medicineFindFirstArgs>(args?: SelectSubset<T, medicineFindFirstArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicineFindFirstOrThrowArgs} args - Arguments to find a Medicine
     * @example
     * // Get one Medicine
     * const medicine = await prisma.medicine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends medicineFindFirstOrThrowArgs>(args?: SelectSubset<T, medicineFindFirstOrThrowArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medicines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medicines
     * const medicines = await prisma.medicine.findMany()
     * 
     * // Get first 10 Medicines
     * const medicines = await prisma.medicine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicineWithIdOnly = await prisma.medicine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends medicineFindManyArgs>(args?: SelectSubset<T, medicineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medicine.
     * @param {medicineCreateArgs} args - Arguments to create a Medicine.
     * @example
     * // Create one Medicine
     * const Medicine = await prisma.medicine.create({
     *   data: {
     *     // ... data to create a Medicine
     *   }
     * })
     * 
     */
    create<T extends medicineCreateArgs>(args: SelectSubset<T, medicineCreateArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medicines.
     * @param {medicineCreateManyArgs} args - Arguments to create many Medicines.
     * @example
     * // Create many Medicines
     * const medicine = await prisma.medicine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends medicineCreateManyArgs>(args?: SelectSubset<T, medicineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Medicine.
     * @param {medicineDeleteArgs} args - Arguments to delete one Medicine.
     * @example
     * // Delete one Medicine
     * const Medicine = await prisma.medicine.delete({
     *   where: {
     *     // ... filter to delete one Medicine
     *   }
     * })
     * 
     */
    delete<T extends medicineDeleteArgs>(args: SelectSubset<T, medicineDeleteArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medicine.
     * @param {medicineUpdateArgs} args - Arguments to update one Medicine.
     * @example
     * // Update one Medicine
     * const medicine = await prisma.medicine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends medicineUpdateArgs>(args: SelectSubset<T, medicineUpdateArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medicines.
     * @param {medicineDeleteManyArgs} args - Arguments to filter Medicines to delete.
     * @example
     * // Delete a few Medicines
     * const { count } = await prisma.medicine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends medicineDeleteManyArgs>(args?: SelectSubset<T, medicineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medicines
     * const medicine = await prisma.medicine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends medicineUpdateManyArgs>(args: SelectSubset<T, medicineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Medicine.
     * @param {medicineUpsertArgs} args - Arguments to update or create a Medicine.
     * @example
     * // Update or create a Medicine
     * const medicine = await prisma.medicine.upsert({
     *   create: {
     *     // ... data to create a Medicine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medicine we want to update
     *   }
     * })
     */
    upsert<T extends medicineUpsertArgs>(args: SelectSubset<T, medicineUpsertArgs<ExtArgs>>): Prisma__medicineClient<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Medicines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicineCountArgs} args - Arguments to filter Medicines to count.
     * @example
     * // Count the number of Medicines
     * const count = await prisma.medicine.count({
     *   where: {
     *     // ... the filter for the Medicines we want to count
     *   }
     * })
    **/
    count<T extends medicineCountArgs>(
      args?: Subset<T, medicineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medicine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicineAggregateArgs>(args: Subset<T, MedicineAggregateArgs>): Prisma.PrismaPromise<GetMedicineAggregateType<T>>

    /**
     * Group by Medicine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends medicineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: medicineGroupByArgs['orderBy'] }
        : { orderBy?: medicineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, medicineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the medicine model
   */
  readonly fields: medicineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for medicine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__medicineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prescription<T extends prescriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, prescriptionDefaultArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the medicine model
   */
  interface medicineFieldRefs {
    readonly id: FieldRef<"medicine", 'Int'>
    readonly name: FieldRef<"medicine", 'String'>
    readonly morning: FieldRef<"medicine", 'String'>
    readonly afternoon: FieldRef<"medicine", 'String'>
    readonly evening: FieldRef<"medicine", 'String'>
    readonly night: FieldRef<"medicine", 'String'>
    readonly quantity: FieldRef<"medicine", 'String'>
    readonly instructions: FieldRef<"medicine", 'String'>
    readonly prescriptionId: FieldRef<"medicine", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * medicine findUnique
   */
  export type medicineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * Filter, which medicine to fetch.
     */
    where: medicineWhereUniqueInput
  }

  /**
   * medicine findUniqueOrThrow
   */
  export type medicineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * Filter, which medicine to fetch.
     */
    where: medicineWhereUniqueInput
  }

  /**
   * medicine findFirst
   */
  export type medicineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * Filter, which medicine to fetch.
     */
    where?: medicineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicines to fetch.
     */
    orderBy?: medicineOrderByWithRelationInput | medicineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for medicines.
     */
    cursor?: medicineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of medicines.
     */
    distinct?: MedicineScalarFieldEnum | MedicineScalarFieldEnum[]
  }

  /**
   * medicine findFirstOrThrow
   */
  export type medicineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * Filter, which medicine to fetch.
     */
    where?: medicineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicines to fetch.
     */
    orderBy?: medicineOrderByWithRelationInput | medicineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for medicines.
     */
    cursor?: medicineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of medicines.
     */
    distinct?: MedicineScalarFieldEnum | MedicineScalarFieldEnum[]
  }

  /**
   * medicine findMany
   */
  export type medicineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * Filter, which medicines to fetch.
     */
    where?: medicineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicines to fetch.
     */
    orderBy?: medicineOrderByWithRelationInput | medicineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing medicines.
     */
    cursor?: medicineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicines.
     */
    skip?: number
    distinct?: MedicineScalarFieldEnum | MedicineScalarFieldEnum[]
  }

  /**
   * medicine create
   */
  export type medicineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * The data needed to create a medicine.
     */
    data: XOR<medicineCreateInput, medicineUncheckedCreateInput>
  }

  /**
   * medicine createMany
   */
  export type medicineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many medicines.
     */
    data: medicineCreateManyInput | medicineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * medicine update
   */
  export type medicineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * The data needed to update a medicine.
     */
    data: XOR<medicineUpdateInput, medicineUncheckedUpdateInput>
    /**
     * Choose, which medicine to update.
     */
    where: medicineWhereUniqueInput
  }

  /**
   * medicine updateMany
   */
  export type medicineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update medicines.
     */
    data: XOR<medicineUpdateManyMutationInput, medicineUncheckedUpdateManyInput>
    /**
     * Filter which medicines to update
     */
    where?: medicineWhereInput
    /**
     * Limit how many medicines to update.
     */
    limit?: number
  }

  /**
   * medicine upsert
   */
  export type medicineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * The filter to search for the medicine to update in case it exists.
     */
    where: medicineWhereUniqueInput
    /**
     * In case the medicine found by the `where` argument doesn't exist, create a new medicine with this data.
     */
    create: XOR<medicineCreateInput, medicineUncheckedCreateInput>
    /**
     * In case the medicine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<medicineUpdateInput, medicineUncheckedUpdateInput>
  }

  /**
   * medicine delete
   */
  export type medicineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    /**
     * Filter which medicine to delete.
     */
    where: medicineWhereUniqueInput
  }

  /**
   * medicine deleteMany
   */
  export type medicineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which medicines to delete
     */
    where?: medicineWhereInput
    /**
     * Limit how many medicines to delete.
     */
    limit?: number
  }

  /**
   * medicine without action
   */
  export type medicineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
  }


  /**
   * Model prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _avg: PrescriptionAvgAggregateOutputType | null
    _sum: PrescriptionSumAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionAvgAggregateOutputType = {
    id: number | null
    age: number | null
  }

  export type PrescriptionSumAggregateOutputType = {
    id: number | null
    age: number | null
  }

  export type PrescriptionMinAggregateOutputType = {
    id: number | null
    patientName: string | null
    gender: string | null
    age: number | null
    diagnosis: string | null
    createdAt: Date | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    id: number | null
    patientName: string | null
    gender: string | null
    age: number | null
    diagnosis: string | null
    createdAt: Date | null
  }

  export type PrescriptionCountAggregateOutputType = {
    id: number
    patientName: number
    gender: number
    age: number
    diagnosis: number
    createdAt: number
    _all: number
  }


  export type PrescriptionAvgAggregateInputType = {
    id?: true
    age?: true
  }

  export type PrescriptionSumAggregateInputType = {
    id?: true
    age?: true
  }

  export type PrescriptionMinAggregateInputType = {
    id?: true
    patientName?: true
    gender?: true
    age?: true
    diagnosis?: true
    createdAt?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    id?: true
    patientName?: true
    gender?: true
    age?: true
    diagnosis?: true
    createdAt?: true
  }

  export type PrescriptionCountAggregateInputType = {
    id?: true
    patientName?: true
    gender?: true
    age?: true
    diagnosis?: true
    createdAt?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prescription to aggregate.
     */
    where?: prescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescriptions to fetch.
     */
    orderBy?: prescriptionOrderByWithRelationInput | prescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: prescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrescriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrescriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type prescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: prescriptionWhereInput
    orderBy?: prescriptionOrderByWithAggregationInput | prescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: prescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _avg?: PrescriptionAvgAggregateInputType
    _sum?: PrescriptionSumAggregateInputType
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    id: number
    patientName: string
    gender: string
    age: number
    diagnosis: string
    createdAt: Date
    _count: PrescriptionCountAggregateOutputType | null
    _avg: PrescriptionAvgAggregateOutputType | null
    _sum: PrescriptionSumAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends prescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type prescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientName?: boolean
    gender?: boolean
    age?: boolean
    diagnosis?: boolean
    createdAt?: boolean
    medicine?: boolean | prescription$medicineArgs<ExtArgs>
    _count?: boolean | PrescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>



  export type prescriptionSelectScalar = {
    id?: boolean
    patientName?: boolean
    gender?: boolean
    age?: boolean
    diagnosis?: boolean
    createdAt?: boolean
  }

  export type prescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientName" | "gender" | "age" | "diagnosis" | "createdAt", ExtArgs["result"]["prescription"]>
  export type prescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicine?: boolean | prescription$medicineArgs<ExtArgs>
    _count?: boolean | PrescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $prescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "prescription"
    objects: {
      medicine: Prisma.$medicinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patientName: string
      gender: string
      age: number
      diagnosis: string
      createdAt: Date
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type prescriptionGetPayload<S extends boolean | null | undefined | prescriptionDefaultArgs> = $Result.GetResult<Prisma.$prescriptionPayload, S>

  type prescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<prescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface prescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['prescription'], meta: { name: 'prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {prescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends prescriptionFindUniqueArgs>(args: SelectSubset<T, prescriptionFindUniqueArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {prescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends prescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, prescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends prescriptionFindFirstArgs>(args?: SelectSubset<T, prescriptionFindFirstArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends prescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, prescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends prescriptionFindManyArgs>(args?: SelectSubset<T, prescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescription.
     * @param {prescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends prescriptionCreateArgs>(args: SelectSubset<T, prescriptionCreateArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescriptions.
     * @param {prescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends prescriptionCreateManyArgs>(args?: SelectSubset<T, prescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Prescription.
     * @param {prescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends prescriptionDeleteArgs>(args: SelectSubset<T, prescriptionDeleteArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescription.
     * @param {prescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends prescriptionUpdateArgs>(args: SelectSubset<T, prescriptionUpdateArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescriptions.
     * @param {prescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends prescriptionDeleteManyArgs>(args?: SelectSubset<T, prescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends prescriptionUpdateManyArgs>(args: SelectSubset<T, prescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prescription.
     * @param {prescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends prescriptionUpsertArgs>(args: SelectSubset<T, prescriptionUpsertArgs<ExtArgs>>): Prisma__prescriptionClient<$Result.GetResult<Prisma.$prescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends prescriptionCountArgs>(
      args?: Subset<T, prescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends prescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: prescriptionGroupByArgs['orderBy'] }
        : { orderBy?: prescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, prescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the prescription model
   */
  readonly fields: prescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__prescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medicine<T extends prescription$medicineArgs<ExtArgs> = {}>(args?: Subset<T, prescription$medicineArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$medicinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the prescription model
   */
  interface prescriptionFieldRefs {
    readonly id: FieldRef<"prescription", 'Int'>
    readonly patientName: FieldRef<"prescription", 'String'>
    readonly gender: FieldRef<"prescription", 'String'>
    readonly age: FieldRef<"prescription", 'Int'>
    readonly diagnosis: FieldRef<"prescription", 'String'>
    readonly createdAt: FieldRef<"prescription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * prescription findUnique
   */
  export type prescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * Filter, which prescription to fetch.
     */
    where: prescriptionWhereUniqueInput
  }

  /**
   * prescription findUniqueOrThrow
   */
  export type prescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * Filter, which prescription to fetch.
     */
    where: prescriptionWhereUniqueInput
  }

  /**
   * prescription findFirst
   */
  export type prescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * Filter, which prescription to fetch.
     */
    where?: prescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescriptions to fetch.
     */
    orderBy?: prescriptionOrderByWithRelationInput | prescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prescriptions.
     */
    cursor?: prescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * prescription findFirstOrThrow
   */
  export type prescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * Filter, which prescription to fetch.
     */
    where?: prescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescriptions to fetch.
     */
    orderBy?: prescriptionOrderByWithRelationInput | prescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prescriptions.
     */
    cursor?: prescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * prescription findMany
   */
  export type prescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * Filter, which prescriptions to fetch.
     */
    where?: prescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescriptions to fetch.
     */
    orderBy?: prescriptionOrderByWithRelationInput | prescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing prescriptions.
     */
    cursor?: prescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescriptions.
     */
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * prescription create
   */
  export type prescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a prescription.
     */
    data: XOR<prescriptionCreateInput, prescriptionUncheckedCreateInput>
  }

  /**
   * prescription createMany
   */
  export type prescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many prescriptions.
     */
    data: prescriptionCreateManyInput | prescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * prescription update
   */
  export type prescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a prescription.
     */
    data: XOR<prescriptionUpdateInput, prescriptionUncheckedUpdateInput>
    /**
     * Choose, which prescription to update.
     */
    where: prescriptionWhereUniqueInput
  }

  /**
   * prescription updateMany
   */
  export type prescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update prescriptions.
     */
    data: XOR<prescriptionUpdateManyMutationInput, prescriptionUncheckedUpdateManyInput>
    /**
     * Filter which prescriptions to update
     */
    where?: prescriptionWhereInput
    /**
     * Limit how many prescriptions to update.
     */
    limit?: number
  }

  /**
   * prescription upsert
   */
  export type prescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the prescription to update in case it exists.
     */
    where: prescriptionWhereUniqueInput
    /**
     * In case the prescription found by the `where` argument doesn't exist, create a new prescription with this data.
     */
    create: XOR<prescriptionCreateInput, prescriptionUncheckedCreateInput>
    /**
     * In case the prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<prescriptionUpdateInput, prescriptionUncheckedUpdateInput>
  }

  /**
   * prescription delete
   */
  export type prescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
    /**
     * Filter which prescription to delete.
     */
    where: prescriptionWhereUniqueInput
  }

  /**
   * prescription deleteMany
   */
  export type prescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prescriptions to delete
     */
    where?: prescriptionWhereInput
    /**
     * Limit how many prescriptions to delete.
     */
    limit?: number
  }

  /**
   * prescription.medicine
   */
  export type prescription$medicineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicine
     */
    select?: medicineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicine
     */
    omit?: medicineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicineInclude<ExtArgs> | null
    where?: medicineWhereInput
    orderBy?: medicineOrderByWithRelationInput | medicineOrderByWithRelationInput[]
    cursor?: medicineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicineScalarFieldEnum | MedicineScalarFieldEnum[]
  }

  /**
   * prescription without action
   */
  export type prescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescription
     */
    select?: prescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescription
     */
    omit?: prescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescriptionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MedicineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
    quantity: 'quantity',
    instructions: 'instructions',
    prescriptionId: 'prescriptionId'
  };

  export type MedicineScalarFieldEnum = (typeof MedicineScalarFieldEnum)[keyof typeof MedicineScalarFieldEnum]


  export const PrescriptionScalarFieldEnum: {
    id: 'id',
    patientName: 'patientName',
    gender: 'gender',
    age: 'age',
    diagnosis: 'diagnosis',
    createdAt: 'createdAt'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const medicineOrderByRelevanceFieldEnum: {
    name: 'name',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
    quantity: 'quantity',
    instructions: 'instructions'
  };

  export type medicineOrderByRelevanceFieldEnum = (typeof medicineOrderByRelevanceFieldEnum)[keyof typeof medicineOrderByRelevanceFieldEnum]


  export const prescriptionOrderByRelevanceFieldEnum: {
    patientName: 'patientName',
    gender: 'gender',
    diagnosis: 'diagnosis'
  };

  export type prescriptionOrderByRelevanceFieldEnum = (typeof prescriptionOrderByRelevanceFieldEnum)[keyof typeof prescriptionOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type medicineWhereInput = {
    AND?: medicineWhereInput | medicineWhereInput[]
    OR?: medicineWhereInput[]
    NOT?: medicineWhereInput | medicineWhereInput[]
    id?: IntFilter<"medicine"> | number
    name?: StringFilter<"medicine"> | string
    morning?: StringNullableFilter<"medicine"> | string | null
    afternoon?: StringNullableFilter<"medicine"> | string | null
    evening?: StringNullableFilter<"medicine"> | string | null
    night?: StringNullableFilter<"medicine"> | string | null
    quantity?: StringFilter<"medicine"> | string
    instructions?: StringFilter<"medicine"> | string
    prescriptionId?: IntFilter<"medicine"> | number
    prescription?: XOR<PrescriptionScalarRelationFilter, prescriptionWhereInput>
  }

  export type medicineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    morning?: SortOrderInput | SortOrder
    afternoon?: SortOrderInput | SortOrder
    evening?: SortOrderInput | SortOrder
    night?: SortOrderInput | SortOrder
    quantity?: SortOrder
    instructions?: SortOrder
    prescriptionId?: SortOrder
    prescription?: prescriptionOrderByWithRelationInput
    _relevance?: medicineOrderByRelevanceInput
  }

  export type medicineWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: medicineWhereInput | medicineWhereInput[]
    OR?: medicineWhereInput[]
    NOT?: medicineWhereInput | medicineWhereInput[]
    name?: StringFilter<"medicine"> | string
    morning?: StringNullableFilter<"medicine"> | string | null
    afternoon?: StringNullableFilter<"medicine"> | string | null
    evening?: StringNullableFilter<"medicine"> | string | null
    night?: StringNullableFilter<"medicine"> | string | null
    quantity?: StringFilter<"medicine"> | string
    instructions?: StringFilter<"medicine"> | string
    prescriptionId?: IntFilter<"medicine"> | number
    prescription?: XOR<PrescriptionScalarRelationFilter, prescriptionWhereInput>
  }, "id">

  export type medicineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    morning?: SortOrderInput | SortOrder
    afternoon?: SortOrderInput | SortOrder
    evening?: SortOrderInput | SortOrder
    night?: SortOrderInput | SortOrder
    quantity?: SortOrder
    instructions?: SortOrder
    prescriptionId?: SortOrder
    _count?: medicineCountOrderByAggregateInput
    _avg?: medicineAvgOrderByAggregateInput
    _max?: medicineMaxOrderByAggregateInput
    _min?: medicineMinOrderByAggregateInput
    _sum?: medicineSumOrderByAggregateInput
  }

  export type medicineScalarWhereWithAggregatesInput = {
    AND?: medicineScalarWhereWithAggregatesInput | medicineScalarWhereWithAggregatesInput[]
    OR?: medicineScalarWhereWithAggregatesInput[]
    NOT?: medicineScalarWhereWithAggregatesInput | medicineScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"medicine"> | number
    name?: StringWithAggregatesFilter<"medicine"> | string
    morning?: StringNullableWithAggregatesFilter<"medicine"> | string | null
    afternoon?: StringNullableWithAggregatesFilter<"medicine"> | string | null
    evening?: StringNullableWithAggregatesFilter<"medicine"> | string | null
    night?: StringNullableWithAggregatesFilter<"medicine"> | string | null
    quantity?: StringWithAggregatesFilter<"medicine"> | string
    instructions?: StringWithAggregatesFilter<"medicine"> | string
    prescriptionId?: IntWithAggregatesFilter<"medicine"> | number
  }

  export type prescriptionWhereInput = {
    AND?: prescriptionWhereInput | prescriptionWhereInput[]
    OR?: prescriptionWhereInput[]
    NOT?: prescriptionWhereInput | prescriptionWhereInput[]
    id?: IntFilter<"prescription"> | number
    patientName?: StringFilter<"prescription"> | string
    gender?: StringFilter<"prescription"> | string
    age?: IntFilter<"prescription"> | number
    diagnosis?: StringFilter<"prescription"> | string
    createdAt?: DateTimeFilter<"prescription"> | Date | string
    medicine?: MedicineListRelationFilter
  }

  export type prescriptionOrderByWithRelationInput = {
    id?: SortOrder
    patientName?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    diagnosis?: SortOrder
    createdAt?: SortOrder
    medicine?: medicineOrderByRelationAggregateInput
    _relevance?: prescriptionOrderByRelevanceInput
  }

  export type prescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: prescriptionWhereInput | prescriptionWhereInput[]
    OR?: prescriptionWhereInput[]
    NOT?: prescriptionWhereInput | prescriptionWhereInput[]
    patientName?: StringFilter<"prescription"> | string
    gender?: StringFilter<"prescription"> | string
    age?: IntFilter<"prescription"> | number
    diagnosis?: StringFilter<"prescription"> | string
    createdAt?: DateTimeFilter<"prescription"> | Date | string
    medicine?: MedicineListRelationFilter
  }, "id">

  export type prescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    patientName?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    diagnosis?: SortOrder
    createdAt?: SortOrder
    _count?: prescriptionCountOrderByAggregateInput
    _avg?: prescriptionAvgOrderByAggregateInput
    _max?: prescriptionMaxOrderByAggregateInput
    _min?: prescriptionMinOrderByAggregateInput
    _sum?: prescriptionSumOrderByAggregateInput
  }

  export type prescriptionScalarWhereWithAggregatesInput = {
    AND?: prescriptionScalarWhereWithAggregatesInput | prescriptionScalarWhereWithAggregatesInput[]
    OR?: prescriptionScalarWhereWithAggregatesInput[]
    NOT?: prescriptionScalarWhereWithAggregatesInput | prescriptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"prescription"> | number
    patientName?: StringWithAggregatesFilter<"prescription"> | string
    gender?: StringWithAggregatesFilter<"prescription"> | string
    age?: IntWithAggregatesFilter<"prescription"> | number
    diagnosis?: StringWithAggregatesFilter<"prescription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"prescription"> | Date | string
  }

  export type medicineCreateInput = {
    name: string
    morning?: string | null
    afternoon?: string | null
    evening?: string | null
    night?: string | null
    quantity: string
    instructions: string
    prescription: prescriptionCreateNestedOneWithoutMedicineInput
  }

  export type medicineUncheckedCreateInput = {
    id?: number
    name: string
    morning?: string | null
    afternoon?: string | null
    evening?: string | null
    night?: string | null
    quantity: string
    instructions: string
    prescriptionId: number
  }

  export type medicineUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prescription?: prescriptionUpdateOneRequiredWithoutMedicineNestedInput
  }

  export type medicineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prescriptionId?: IntFieldUpdateOperationsInput | number
  }

  export type medicineCreateManyInput = {
    id?: number
    name: string
    morning?: string | null
    afternoon?: string | null
    evening?: string | null
    night?: string | null
    quantity: string
    instructions: string
    prescriptionId: number
  }

  export type medicineUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
  }

  export type medicineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prescriptionId?: IntFieldUpdateOperationsInput | number
  }

  export type prescriptionCreateInput = {
    patientName: string
    gender: string
    age: number
    diagnosis: string
    createdAt?: Date | string
    medicine?: medicineCreateNestedManyWithoutPrescriptionInput
  }

  export type prescriptionUncheckedCreateInput = {
    id?: number
    patientName: string
    gender: string
    age: number
    diagnosis: string
    createdAt?: Date | string
    medicine?: medicineUncheckedCreateNestedManyWithoutPrescriptionInput
  }

  export type prescriptionUpdateInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    diagnosis?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicine?: medicineUpdateManyWithoutPrescriptionNestedInput
  }

  export type prescriptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    diagnosis?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicine?: medicineUncheckedUpdateManyWithoutPrescriptionNestedInput
  }

  export type prescriptionCreateManyInput = {
    id?: number
    patientName: string
    gender: string
    age: number
    diagnosis: string
    createdAt?: Date | string
  }

  export type prescriptionUpdateManyMutationInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    diagnosis?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type prescriptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    diagnosis?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PrescriptionScalarRelationFilter = {
    is?: prescriptionWhereInput
    isNot?: prescriptionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type medicineOrderByRelevanceInput = {
    fields: medicineOrderByRelevanceFieldEnum | medicineOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type medicineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    morning?: SortOrder
    afternoon?: SortOrder
    evening?: SortOrder
    night?: SortOrder
    quantity?: SortOrder
    instructions?: SortOrder
    prescriptionId?: SortOrder
  }

  export type medicineAvgOrderByAggregateInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
  }

  export type medicineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    morning?: SortOrder
    afternoon?: SortOrder
    evening?: SortOrder
    night?: SortOrder
    quantity?: SortOrder
    instructions?: SortOrder
    prescriptionId?: SortOrder
  }

  export type medicineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    morning?: SortOrder
    afternoon?: SortOrder
    evening?: SortOrder
    night?: SortOrder
    quantity?: SortOrder
    instructions?: SortOrder
    prescriptionId?: SortOrder
  }

  export type medicineSumOrderByAggregateInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MedicineListRelationFilter = {
    every?: medicineWhereInput
    some?: medicineWhereInput
    none?: medicineWhereInput
  }

  export type medicineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type prescriptionOrderByRelevanceInput = {
    fields: prescriptionOrderByRelevanceFieldEnum | prescriptionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type prescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    diagnosis?: SortOrder
    createdAt?: SortOrder
  }

  export type prescriptionAvgOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
  }

  export type prescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    diagnosis?: SortOrder
    createdAt?: SortOrder
  }

  export type prescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    gender?: SortOrder
    age?: SortOrder
    diagnosis?: SortOrder
    createdAt?: SortOrder
  }

  export type prescriptionSumOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type prescriptionCreateNestedOneWithoutMedicineInput = {
    create?: XOR<prescriptionCreateWithoutMedicineInput, prescriptionUncheckedCreateWithoutMedicineInput>
    connectOrCreate?: prescriptionCreateOrConnectWithoutMedicineInput
    connect?: prescriptionWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type prescriptionUpdateOneRequiredWithoutMedicineNestedInput = {
    create?: XOR<prescriptionCreateWithoutMedicineInput, prescriptionUncheckedCreateWithoutMedicineInput>
    connectOrCreate?: prescriptionCreateOrConnectWithoutMedicineInput
    upsert?: prescriptionUpsertWithoutMedicineInput
    connect?: prescriptionWhereUniqueInput
    update?: XOR<XOR<prescriptionUpdateToOneWithWhereWithoutMedicineInput, prescriptionUpdateWithoutMedicineInput>, prescriptionUncheckedUpdateWithoutMedicineInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type medicineCreateNestedManyWithoutPrescriptionInput = {
    create?: XOR<medicineCreateWithoutPrescriptionInput, medicineUncheckedCreateWithoutPrescriptionInput> | medicineCreateWithoutPrescriptionInput[] | medicineUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: medicineCreateOrConnectWithoutPrescriptionInput | medicineCreateOrConnectWithoutPrescriptionInput[]
    createMany?: medicineCreateManyPrescriptionInputEnvelope
    connect?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
  }

  export type medicineUncheckedCreateNestedManyWithoutPrescriptionInput = {
    create?: XOR<medicineCreateWithoutPrescriptionInput, medicineUncheckedCreateWithoutPrescriptionInput> | medicineCreateWithoutPrescriptionInput[] | medicineUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: medicineCreateOrConnectWithoutPrescriptionInput | medicineCreateOrConnectWithoutPrescriptionInput[]
    createMany?: medicineCreateManyPrescriptionInputEnvelope
    connect?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type medicineUpdateManyWithoutPrescriptionNestedInput = {
    create?: XOR<medicineCreateWithoutPrescriptionInput, medicineUncheckedCreateWithoutPrescriptionInput> | medicineCreateWithoutPrescriptionInput[] | medicineUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: medicineCreateOrConnectWithoutPrescriptionInput | medicineCreateOrConnectWithoutPrescriptionInput[]
    upsert?: medicineUpsertWithWhereUniqueWithoutPrescriptionInput | medicineUpsertWithWhereUniqueWithoutPrescriptionInput[]
    createMany?: medicineCreateManyPrescriptionInputEnvelope
    set?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    disconnect?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    delete?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    connect?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    update?: medicineUpdateWithWhereUniqueWithoutPrescriptionInput | medicineUpdateWithWhereUniqueWithoutPrescriptionInput[]
    updateMany?: medicineUpdateManyWithWhereWithoutPrescriptionInput | medicineUpdateManyWithWhereWithoutPrescriptionInput[]
    deleteMany?: medicineScalarWhereInput | medicineScalarWhereInput[]
  }

  export type medicineUncheckedUpdateManyWithoutPrescriptionNestedInput = {
    create?: XOR<medicineCreateWithoutPrescriptionInput, medicineUncheckedCreateWithoutPrescriptionInput> | medicineCreateWithoutPrescriptionInput[] | medicineUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: medicineCreateOrConnectWithoutPrescriptionInput | medicineCreateOrConnectWithoutPrescriptionInput[]
    upsert?: medicineUpsertWithWhereUniqueWithoutPrescriptionInput | medicineUpsertWithWhereUniqueWithoutPrescriptionInput[]
    createMany?: medicineCreateManyPrescriptionInputEnvelope
    set?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    disconnect?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    delete?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    connect?: medicineWhereUniqueInput | medicineWhereUniqueInput[]
    update?: medicineUpdateWithWhereUniqueWithoutPrescriptionInput | medicineUpdateWithWhereUniqueWithoutPrescriptionInput[]
    updateMany?: medicineUpdateManyWithWhereWithoutPrescriptionInput | medicineUpdateManyWithWhereWithoutPrescriptionInput[]
    deleteMany?: medicineScalarWhereInput | medicineScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type prescriptionCreateWithoutMedicineInput = {
    patientName: string
    gender: string
    age: number
    diagnosis: string
    createdAt?: Date | string
  }

  export type prescriptionUncheckedCreateWithoutMedicineInput = {
    id?: number
    patientName: string
    gender: string
    age: number
    diagnosis: string
    createdAt?: Date | string
  }

  export type prescriptionCreateOrConnectWithoutMedicineInput = {
    where: prescriptionWhereUniqueInput
    create: XOR<prescriptionCreateWithoutMedicineInput, prescriptionUncheckedCreateWithoutMedicineInput>
  }

  export type prescriptionUpsertWithoutMedicineInput = {
    update: XOR<prescriptionUpdateWithoutMedicineInput, prescriptionUncheckedUpdateWithoutMedicineInput>
    create: XOR<prescriptionCreateWithoutMedicineInput, prescriptionUncheckedCreateWithoutMedicineInput>
    where?: prescriptionWhereInput
  }

  export type prescriptionUpdateToOneWithWhereWithoutMedicineInput = {
    where?: prescriptionWhereInput
    data: XOR<prescriptionUpdateWithoutMedicineInput, prescriptionUncheckedUpdateWithoutMedicineInput>
  }

  export type prescriptionUpdateWithoutMedicineInput = {
    patientName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    diagnosis?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type prescriptionUncheckedUpdateWithoutMedicineInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    diagnosis?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type medicineCreateWithoutPrescriptionInput = {
    name: string
    morning?: string | null
    afternoon?: string | null
    evening?: string | null
    night?: string | null
    quantity: string
    instructions: string
  }

  export type medicineUncheckedCreateWithoutPrescriptionInput = {
    id?: number
    name: string
    morning?: string | null
    afternoon?: string | null
    evening?: string | null
    night?: string | null
    quantity: string
    instructions: string
  }

  export type medicineCreateOrConnectWithoutPrescriptionInput = {
    where: medicineWhereUniqueInput
    create: XOR<medicineCreateWithoutPrescriptionInput, medicineUncheckedCreateWithoutPrescriptionInput>
  }

  export type medicineCreateManyPrescriptionInputEnvelope = {
    data: medicineCreateManyPrescriptionInput | medicineCreateManyPrescriptionInput[]
    skipDuplicates?: boolean
  }

  export type medicineUpsertWithWhereUniqueWithoutPrescriptionInput = {
    where: medicineWhereUniqueInput
    update: XOR<medicineUpdateWithoutPrescriptionInput, medicineUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<medicineCreateWithoutPrescriptionInput, medicineUncheckedCreateWithoutPrescriptionInput>
  }

  export type medicineUpdateWithWhereUniqueWithoutPrescriptionInput = {
    where: medicineWhereUniqueInput
    data: XOR<medicineUpdateWithoutPrescriptionInput, medicineUncheckedUpdateWithoutPrescriptionInput>
  }

  export type medicineUpdateManyWithWhereWithoutPrescriptionInput = {
    where: medicineScalarWhereInput
    data: XOR<medicineUpdateManyMutationInput, medicineUncheckedUpdateManyWithoutPrescriptionInput>
  }

  export type medicineScalarWhereInput = {
    AND?: medicineScalarWhereInput | medicineScalarWhereInput[]
    OR?: medicineScalarWhereInput[]
    NOT?: medicineScalarWhereInput | medicineScalarWhereInput[]
    id?: IntFilter<"medicine"> | number
    name?: StringFilter<"medicine"> | string
    morning?: StringNullableFilter<"medicine"> | string | null
    afternoon?: StringNullableFilter<"medicine"> | string | null
    evening?: StringNullableFilter<"medicine"> | string | null
    night?: StringNullableFilter<"medicine"> | string | null
    quantity?: StringFilter<"medicine"> | string
    instructions?: StringFilter<"medicine"> | string
    prescriptionId?: IntFilter<"medicine"> | number
  }

  export type medicineCreateManyPrescriptionInput = {
    id?: number
    name: string
    morning?: string | null
    afternoon?: string | null
    evening?: string | null
    night?: string | null
    quantity: string
    instructions: string
  }

  export type medicineUpdateWithoutPrescriptionInput = {
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
  }

  export type medicineUncheckedUpdateWithoutPrescriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
  }

  export type medicineUncheckedUpdateManyWithoutPrescriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    morning?: NullableStringFieldUpdateOperationsInput | string | null
    afternoon?: NullableStringFieldUpdateOperationsInput | string | null
    evening?: NullableStringFieldUpdateOperationsInput | string | null
    night?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}