import { GoBack } from "../shared/GoBack";
import { UserProfile } from "./UserProfile";
import { UserProfileTabs } from "./UserProfileTabs";

export const MySamples = () => {
  return (
    <div className="min-h-[90vh] w-full bg-grey-900 rounded-2xl py-4 pl-3 md:pl-6 space-y-5 md:space-y-10">
      <div className="md:p-2">
        <GoBack />
        <h2 className="md:text-5xl text-lg font-arvo font-semibold mt-6">
          Profile
        </h2>
        <div className="md:my-8 my-5">
          <UserProfile />
          <UserProfileTabs />
        </div>
      </div>
    </div>
  );
};
