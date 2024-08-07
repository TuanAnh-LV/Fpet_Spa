import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useSelector } from "react-redux";

const Service = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.login?.currentUser);

  const handleBookingClick = () => {
    if (isLoggedIn) {
      navigate("/booking");
    } else {
      alert("Please log in to book a service.");
      navigate("/login", { state: { returnTo: "/service" } });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    
    <div className="min-h-screen max-w-full mt-10">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-20 lg:gap-x-0">
        <div className="lg:text-left">
          <h6 className="text-[20px] font-normal leading-6 mt-10 text-[#000000]">
            Discover Top-notch Pet Care Services
          </h6>
          <h1 className="text-[54px] font-bold leading-[64.8px] mb-8 text-[#000000]">
            High-end pet care
          </h1>
          <p className="mb-4 lg:max-w-md">
            At Fpet, we understand that your pet is family, and we treat them as{" "}
            <br />
            such. With a range of services including pet sitting, and <br />
            personalized training, we're here to support you and your pet every{" "}
            <br />
            step of the way. Trust us to provide the care and attention your{" "}
            <br />
            furry friend deserves.
          </p>
          <button
            className="border rounded-full bg-black text-white py-2.5 px-16"
            onClick={handleBookingClick}>
            Booking
          </button>
        </div>
        <div className="mt-6 lg:mt-0">
          <img
            src={assets.ser_1}
            alt=""
            className="w-[608px] h-[350.312px]"
          />
        </div>
      </div>

    </div>
  );
};

export default Service;
