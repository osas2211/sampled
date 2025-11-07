import { useOnboarding } from "../../hooks/useOnboarding";
import { Avatar, Button } from "antd";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const avatars = [
  "/assets/images/avatars/avatar-1.avif",
  "/assets/images/avatars/avatar-2.avif",
  "/assets/images/avatars/avatar-7.avif",
  "/assets/images/avatars/avatar-8.avif",
  "/assets/images/avatars/avatar-9.avif",
  "/assets/images/avatars/avatar-3.avif",
  "/assets/images/avatars/avatar-10.avif",
  "/assets/images/avatars/avatar-4.avif",
  "/assets/images/avatars/avatar-11.avif",
  "/assets/images/avatars/avatar-5.avif",
  "/assets/images/avatars/avatar-6.avif",
];

export const ChooseAvatar = () => {
  const {
    onUpdateState,
    data: { fields },
  } = useOnboarding();

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex items-center gap-4 md:gap-7 justify-center flex-wrap">
        {avatars.map((avatar_, index) => {
          const isSelected = avatar_ === fields.avatar;
          return (
            <Avatar
              key={index}
              src={avatar_}
              className={`md:!h-[8rem] md:!w-[8rem] !h-[5rem] !w-[5rem] cursor-pointer relative transition-all ${
                isSelected ? "!border-[6px] !border-primary" : ""
              }`}
              onClick={() =>
                onUpdateState({ fields: { ...fields, avatar: avatar_ } })
              }
            ></Avatar>
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
            onClick={() => onUpdateState({ step: 1 })}
          >
            Prev
          </Button>
          <Button
            type="primary"
            className="!rounded-full md:!px-8 md:!w-[150px] !w-[140px] !h-[40px]"
            icon={<BsArrowRight />}
            iconPosition="end"
            htmlType="submit"
            onClick={() => {
              onUpdateState({
                step: 3,
              });
            }}
          >
            Next
          </Button>
        </div>

        <p className="text-xs text-grey-300 text-center mt-5">
          Privacy and Policy
        </p>
      </div>
    </div>
  );
};
