/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-declaration-merging */

import { Buffer } from "buffer";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type { u32, u64, i128 } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}

export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDSCV2AJ2QUKSNBFFPPXY2FRIO2SWYSONM66XO6QTN4N326MRSWY6DDT",
  },
} as const;

export interface Sample {
  bpm: u32;
  cover_image: string;
  genre: string;
  id: u32;
  ipfs_link: string;
  is_active: boolean;
  price: i128;
  seller: string;
  title: string;
  total_sales: u32;
}

export interface Purchase {
  buyer: string;
  price_paid: i128;
  sample_id: u32;
  timestamp: u64;
}

export const Errors = {
  1: { message: "NotAuthorized" },
  2: { message: "SampleNotFound" },
  3: { message: "InsufficientPayment" },
  4: { message: "AlreadyPurchased" },
  5: { message: "InvalidPrice" },
  6: { message: "WithdrawFailed" },
};

export type StorageKey =
  | { tag: "Sample"; values: readonly [u32] }
  | { tag: "Purchase"; values: readonly [string, u32] }
  | { tag: "UserSamples"; values: readonly [string] }
  | { tag: "Earnings"; values: readonly [string] }
  | { tag: "UserPurchases"; values: readonly [string] }
  | { tag: "PlaformFee"; values: void }
  | { tag: "TotalSamples"; values: void }
  | { tag: "PlatformAddress"; values: void }
  | { tag: "TotalVolume"; values: void };

export interface Client {
  /**
   * Construct and simulate a upload_sample transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * UPLOAD a sample
   */
  upload_sample: (
    {
      seller,
      price,
      ipfs_link,
      title,
      bpm,
      genre,
      cover_image,
    }: {
      seller: string;
      price: i128;
      ipfs_link: string;
      title: string;
      bpm: u32;
      genre: string;
      cover_image: string;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<u32>>;

  /**
   * Construct and simulate a get_sample transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * GET a sample
   */
  get_sample: (
    { sample_id }: { sample_id: u32 },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Result<Sample>>>;

  /**
   * Construct and simulate a update_price transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * UPDATE a sample price
   */
  update_price: (
    {
      new_price,
      sample_id,
      seller,
    }: { new_price: i128; sample_id: u32; seller: string },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Result<void>>>;

  /**
   * Construct and simulate a get_user_samples transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * GET user samples
   */
  get_user_samples: (
    { user_address }: { user_address: string },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Array<Sample>>>;

  /**
   * Construct and simulate a get_all_samples transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_all_samples: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<Sample>>>;

  /**
   * Construct and simulate a purchase_sample transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  purchase_sample: (
    { buyer, sample_id }: { buyer: string; sample_id: u32 },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Result<string>>>;

  /**
   * Construct and simulate a get_user_purchases transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_purchases: (
    { buyer }: { buyer: string },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Array<Sample>>>;

  /**
   * Construct and simulate a has_purchased transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  has_purchased: (
    { buyer, sample_id }: { buyer: string; sample_id: u32 },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<boolean>>;

  /**
   * Construct and simulate a withdraw_earnings transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_earnings: (
    { user }: { user: string },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Result<i128>>>;

  /**
   * Construct and simulate a get_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_stats: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<readonly [u32, i128]>>;

  /**
   * Construct and simulate a get_earnings transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_earnings: (
    { user }: { user: string },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;

      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;

      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<i128>>;
}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Constructor/Initialization Args for the contract's `__constructor` method */
    {
      platform_fee,
      platform_address,
    }: { platform_fee: u32; platform_address: string },
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      },
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy({ platform_fee, platform_address }, options);
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([
        "AAAAAQAAAAAAAAAAAAAABlNhbXBsZQAAAAAACgAAAAAAAAADYnBtAAAAAAQAAAAAAAAAC2NvdmVyX2ltYWdlAAAAABAAAAAAAAAABWdlbnJlAAAAAAAAEAAAAAAAAAACaWQAAAAAAAQAAAAAAAAACWlwZnNfbGluawAAAAAAABAAAAAAAAAACWlzX2FjdGl2ZQAAAAAAAAEAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAGc2VsbGVyAAAAAAATAAAAAAAAAAV0aXRsZQAAAAAAABAAAAAAAAAAC3RvdGFsX3NhbGVzAAAAAAQ=",
        "AAAAAQAAAAAAAAAAAAAACFB1cmNoYXNlAAAABAAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAApwcmljZV9wYWlkAAAAAAALAAAAAAAAAAlzYW1wbGVfaWQAAAAAAAAEAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAG",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABgAAAAAAAAANTm90QXV0aG9yaXplZAAAAAAAAAEAAAAAAAAADlNhbXBsZU5vdEZvdW5kAAAAAAACAAAAAAAAABNJbnN1ZmZpY2llbnRQYXltZW50AAAAAAMAAAAAAAAAEEFscmVhZHlQdXJjaGFzZWQAAAAEAAAAAAAAAAxJbnZhbGlkUHJpY2UAAAAFAAAAAAAAAA5XaXRoZHJhd0ZhaWxlZAAAAAAABg==",
        "AAAAAgAAAAAAAAAAAAAAClN0b3JhZ2VLZXkAAAAAAAkAAAABAAAAAAAAAAZTYW1wbGUAAAAAAAEAAAAEAAAAAQAAAAAAAAAIUHVyY2hhc2UAAAACAAAAEwAAAAQAAAABAAAAAAAAAAtVc2VyU2FtcGxlcwAAAAABAAAAEwAAAAEAAAAAAAAACEVhcm5pbmdzAAAAAQAAABMAAAABAAAAAAAAAA1Vc2VyUHVyY2hhc2VzAAAAAAAAAQAAABMAAAAAAAAAAAAAAApQbGFmb3JtRmVlAAAAAAAAAAAAAAAAAAxUb3RhbFNhbXBsZXMAAAAAAAAAAAAAAA9QbGF0Zm9ybUFkZHJlc3MAAAAAAAAAAAAAAAALVG90YWxWb2x1bWUA",
        "AAAAAAAAAAAAAAANX19jb25zdHJ1Y3RvcgAAAAAAAAIAAAAAAAAADHBsYXRmb3JtX2ZlZQAAAAQAAAAAAAAAEHBsYXRmb3JtX2FkZHJlc3MAAAATAAAAAA==",
        "AAAAAAAAAA9VUExPQUQgYSBzYW1wbGUAAAAADXVwbG9hZF9zYW1wbGUAAAAAAAAHAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAJaXBmc19saW5rAAAAAAAAEAAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAAAAAANicG0AAAAABAAAAAAAAAAFZ2VucmUAAAAAAAAQAAAAAAAAAAtjb3Zlcl9pbWFnZQAAAAAQAAAAAQAAAAQ=",
        "AAAAAAAAAAxHRVQgYSBzYW1wbGUAAAAKZ2V0X3NhbXBsZQAAAAAAAQAAAAAAAAAJc2FtcGxlX2lkAAAAAAAABAAAAAEAAAPpAAAH0AAAAAZTYW1wbGUAAAAAAAM=",
        "AAAAAAAAABVVUERBVEUgYSBzYW1wbGUgcHJpY2UAAAAAAAAMdXBkYXRlX3ByaWNlAAAAAwAAAAAAAAAJbmV3X3ByaWNlAAAAAAAACwAAAAAAAAAJc2FtcGxlX2lkAAAAAAAABAAAAAAAAAAGc2VsbGVyAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAABBHRVQgdXNlciBzYW1wbGVzAAAAEGdldF91c2VyX3NhbXBsZXMAAAABAAAAAAAAAAx1c2VyX2FkZHJlc3MAAAATAAAAAQAAA+oAAAfQAAAABlNhbXBsZQAA",
        "AAAAAAAAAAAAAAAPZ2V0X2FsbF9zYW1wbGVzAAAAAAAAAAABAAAD6gAAB9AAAAAGU2FtcGxlAAA=",
        "AAAAAAAAAAAAAAAPcHVyY2hhc2Vfc2FtcGxlAAAAAAIAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAAJc2FtcGxlX2lkAAAAAAAABAAAAAEAAAPpAAAAEAAAAAM=",
        "AAAAAAAAAAAAAAASZ2V0X3VzZXJfcHVyY2hhc2VzAAAAAAABAAAAAAAAAAVidXllcgAAAAAAABMAAAABAAAD6gAAB9AAAAAGU2FtcGxlAAA=",
        "AAAAAAAAAAAAAAANaGFzX3B1cmNoYXNlZAAAAAAAAAIAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAAJc2FtcGxlX2lkAAAAAAAABAAAAAEAAAAB",
        "AAAAAAAAAAAAAAARd2l0aGRyYXdfZWFybmluZ3MAAAAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAACwAAAAM=",
        "AAAAAAAAAAAAAAAJZ2V0X3N0YXRzAAAAAAAAAAAAAAEAAAPtAAAAAgAAAAQAAAAL",
        "AAAAAAAAAAAAAAAMZ2V0X2Vhcm5pbmdzAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAACw==",
      ]),
      options,
    );
  }
  public readonly fromJSON = {
    upload_sample: this.txFromJSON<u32>,
    get_sample: this.txFromJSON<Result<Sample>>,
    update_price: this.txFromJSON<Result<void>>,
    get_user_samples: this.txFromJSON<Array<Sample>>,
    get_all_samples: this.txFromJSON<Array<Sample>>,
    purchase_sample: this.txFromJSON<Result<string>>,
    get_user_purchases: this.txFromJSON<Array<Sample>>,
    has_purchased: this.txFromJSON<boolean>,
    withdraw_earnings: this.txFromJSON<Result<i128>>,
    get_stats: this.txFromJSON<readonly [u32, i128]>,
    get_earnings: this.txFromJSON<i128>,
  };
}
