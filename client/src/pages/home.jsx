"use client";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Button } from "../components";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Elivatsaas's Application2</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="w-full bg-white-A700">
        <div className="flex flex-col items-center">
          <div className="self-stretch h-[603px] md:h-auto relative">
            <div className="flex flex-col items-center w-full gap-[69px] sm:gap-[34px]">
              <div className="self-stretch h-[400px] md:h-auto p-[101px] md:p-5 bg-gray-900 relative">
                <div className="flex justify-between w-[23%] mb-[9px] mr-[58px] gap-5 md:mr-0">
                  <Button shape="square" className="min-w-[97px]">
                    LOGIN
                  </Button>
                  <Button
                    shape="square"
                    className="!text-black-900 min-w-[122px]"
                  >
                    Sign up
                  </Button>
                </div>
                <div className="flex md:flex-col items-start bottom-[26%] right-[11%] m-auto absolute md:relative">
                  <Text
                    size="lg"
                    as="p"
                    className="!text-white-A700 !font-jacquesfrancois uppercase z-[1]"
                  >
                    S4
                  </Text>
                  <div className="flex mt-2 ml-[-15px] md:ml-0 relative">
                    <div className="flex">
                      <Text
                        size="xs"
                        as="p"
                        className="!text-white-A700 !font-inter uppercase"
                      >
                        Home Schedule Employees Announcements{" "}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <Text size="md" as="p" className="tracking-[3.00px] text-center">
                Schedule With Ease!
              </Text>
            </div>
            <Img
              src="images/img_screenshot_2024_03_26.png"
              alt="screenshot2024"
              className="h-[550px] w-[50%] left-[0.00px] top-[0.00px] m-auto object-cover absolute"
            />
          </div>
          <Text
            as="p"
            className="w-[54%] md:w-full mt-[45px] md:p-5 text-center leading-[62px]"
          >
            S4 is a scheduling software that allows for the easy creation of
            schedules for your employees through an auto generating formula,
            based off of the data you give us!
          </Text>
          <Text
            as="p"
            className="w-[54%] md:w-full mt-[110px] md:p-5 text-center leading-[56px]"
          >
            S4 makes it scheduling, and viewing schedules easy to use for all
            users, from those who create schedules, to those who work them,{" "}
          </Text>
          <div className="self-stretch h-[400px] mt-[336px] bg-gray-900" />
        </div>
      </div>
    </>
  );
};

export default Home;
