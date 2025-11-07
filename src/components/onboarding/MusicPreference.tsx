import { musicGenres } from "../../constants/genres";
import { useOnboarding } from "../../hooks/useOnboarding";
import { Avatar, Button } from "antd";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

export const MusicPreference = () => {
  const {
    onUpdateState,
    data: { fields },
  } = useOnboarding();

  return (
    <div className="max-w-[650px] mx-auto">
      <div className="flex items-center gap-4 md:gap-7 justify-center flex-wrap">
        {musicGenres.map((genre, index) => {
          const isSelected = fields.preference.includes(genre.name);
          return (
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-md bg-grey-800 cursor-pointer ${
                isSelected ? "!border-[1px] !border-primary" : ""
              }`}
              key={index}
              onClick={() => {
                const updatedPref = fields.preference;
                if (!isSelected) {
                  updatedPref.push(genre.name);
                  onUpdateState({
                    fields: { ...fields, preference: updatedPref },
                  });
                } else {
                  const newArr = updatedPref.filter(
                    (pref) => pref !== genre.name,
                  );
                  onUpdateState({
                    fields: { ...fields, preference: newArr },
                  });
                }
              }}
            >
              <Avatar
                src={genre.image}
                className={`md:!h-[2rem] md:!w-[2rem] !h-[2rem] !w-[2rem] relative transition-all `}
              ></Avatar>
              <p>{genre.name}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 md:mt-10">
        <div className="flex justify-center gap-5 items-center">
          <Button
            type="default"
            className="!rounded-full md:!px-8 md:!w-[150px] !h-[40px] !w-[140px]"
            icon={<BsArrowLeft />}
            htmlType="button"
            onClick={() => onUpdateState({ step: 2 })}
          >
            Prev
          </Button>
          <Button
            type="primary"
            className="!rounded-full md:!px-8 md:!w-[150px] !w-[140px] !h-[40px]"
            iconPosition="end"
            htmlType="submit"
            onClick={() => {
              onUpdateState({
                step: 4,
              });
            }}
          >
            Submit
          </Button>
        </div>

        <p className="text-xs text-grey-300 text-center mt-5">
          Privacy and Policy
        </p>
      </div>
    </div>
  );
};
