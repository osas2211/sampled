/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions*/
import { Avatar, Button, Input, Select } from "antd";
import { useState } from "react";

const priceValues: (number | "max")[] = [0.001, 0.01, 0.1, "max"];

export const PurchaseSampleTab = () => {
  const [toBuy, setToBuy] = useState(true);
  const [amount, setAmount] = useState<number | "max">(0);
  return (
    <div className="pt-4 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            type={toBuy ? "primary" : "text"}
            onClick={() => {
              setToBuy(true);
            }}
          >
            Buy
          </Button>
          <Button
            type={toBuy ? "text" : "primary"}
            className={!toBuy ? "!bg-red-500 !text-white" : ""}
            onClick={() => {
              setToBuy(false);
            }}
          >
            Sell
          </Button>
        </div>
        <p>
          <span className="text-grey-300">Balance:</span> 0 SOL
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Input
            className="h-[60px] !border-none !bg-grey-700 md:!text-2xl"
            placeholder="0.0"
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value as any);
            }}
            // showCount={true}
          />
          <div className="absolute right-[0.5rem] top-[50%] translate-y-[-50%]">
            <Select
              defaultValue={"zora"}
              className="w-[120px] !bg-black !border-none !z-[10] !relative"
              options={[
                {
                  value: "base",
                  label: (
                    <div className="flex items-center gap-1">
                      <Avatar src={"/sol.png"} size={18} />
                      <p>SOL</p>
                    </div>
                  ),
                },
                {
                  value: "zora",
                  label: (
                    <div className="flex items-center gap-1">
                      <Avatar src={"/sol.png"} size={18} />
                      <p>SOL</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {priceValues.map((value, index) => {
            return (
              <Button
                key={index}
                className="w-full capitalize"
                onClick={() => {
                  value === "max" ? setAmount(0) : setAmount(value);
                }}
              >
                {value} {value !== "max" && "SOL"}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        <Button
          className={` w-full !h-[45px]`}
          type="primary"
          size="large"
          // disabled
          danger={!toBuy}
        >
          {toBuy ? "Buy" : "Sell"}
        </Button>
        <div className="flex items-center justify-between">
          <p className="text-grey-300">Minimum received</p>
          <p>4,526,000</p>
        </div>
      </div>
    </div>
  );
};
