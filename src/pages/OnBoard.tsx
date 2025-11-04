"use client";
import { Logo } from "../components/shared/Logo";
import { useOnboarding } from "../hooks/useOnboarding";
import { ProfileDetails } from "../components/onboarding/ProfileDetails";
import { ChooseAvatar } from "../components/onboarding/ChooseAvatar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MusicPreference } from "../components/onboarding/MusicPreference";
import { OnboardCompleted } from "../components/onboarding/OnboardCompleted";

const OnBoardPage = () => {
  const {
    // onUpdateState,
    data: {
      step,
      // fields
    },
  } = useOnboarding();

  useGSAP(() => {
    gsap.fromTo(
      ".onboard-details",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
    );
  }, [step]);
  return (
    <div className="md:py-[5rem] py-12 px-4 max-w-[700px] mx-auto">
      <div className="flex items-center justify-center flex-col gap-4 md:gap-6 mb-6 md:mb-8 max-w-[450px] mx-auto">
        <Logo />
        <div className="flex gap-4 items-center w-full">
          <div className="h-[3px] rounded-full w-full relative bg-grey-600 transition-all">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-[0.75s]"
              style={{ width: `${step * 25}%` }}
            ></div>
          </div>
          <div className="text-sm text-grey-300">
            <span className="text-pale-grey text-[16px]">{step}</span>/4
          </div>
        </div>
        <h2 className="md:text-xl text-lg mt-2">
          {step === 1
            ? "Tell us about yourself"
            : step === 2
              ? "Choose your avatar"
              : step === 3
                ? "Select your preference"
                : ""}
        </h2>
      </div>

      <div className="onboard-details">
        {step === 1 ? (
          <ProfileDetails />
        ) : step === 2 ? (
          <>
            <ChooseAvatar />
          </>
        ) : step === 3 ? (
          <>
            <MusicPreference />
          </>
        ) : (
          <>
            <OnboardCompleted />
          </>
        )}
      </div>
    </div>
  );
};

export default OnBoardPage;
