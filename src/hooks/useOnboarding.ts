"use client";
import { onboardingContext } from "../context/onboarding-context";
import { use } from "react";

export const useOnboarding = () => {
  return use(onboardingContext);
};
