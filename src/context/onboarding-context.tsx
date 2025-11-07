import { IOnboardData, IOnboardContext } from "../@types/onboard";
import { createContext, useState } from "react";

const defaultData = {
  fields: {
    username: "",
    address: "",
    dob: "",
    gender: "",
    email: "",
    avatar: "",
    preference: [],
  },
  step: 1,
};

export const onboardingContext = createContext<IOnboardContext>({
  data: defaultData,
  onUpdateState: () => {},
});

export const OnboardingProvider = ({ children = <></> }) => {
  const [onboardingState, setOnboadingState] =
    useState<IOnboardData>(defaultData);
  const onUpdateState = (value: Partial<IOnboardData>) => {
    setOnboadingState((prev) => ({
      ...prev,
      ...value,
      fields: {
        ...prev.fields,
        ...(value.fields || {}),
      },
    }));
  };
  return (
    <onboardingContext.Provider
      value={{ data: onboardingState, onUpdateState }}
    >
      {children}
    </onboardingContext.Provider>
  );
};
