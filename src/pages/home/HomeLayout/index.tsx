import { Outlet } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";

const HomeLayout = () => {
  return (
    <div className="flex justify-between min-h-screen">
      {/* <div className="hidden h-full lg:block">
        <Sidebar mobile={false} onToggle={() => {}} onClose={() => {}} />
      </div> */}

      <div className="flex flex-col w-full h-full overflow-y-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
