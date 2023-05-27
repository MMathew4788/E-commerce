import React from "react";
import Layout from "../components/Layouts/Layout";

const About = () => {
  return (
    <Layout>
      <h1 className="relative flex flex-col items-center justify-center space-y-6 mt-28 px-4">
        <h1 className="text-xl font-bold">About Us</h1>
        <div className="relative text-center p-5 border w-[20rem] bg-cyan-300">
          <div className="absolute w-[10rem] h-[10rem] bg-cyan-500 rounded-full -z-10 top-12 -left-12"></div>
          <div className="absolute w-[20rem] h-[11rem] bg-cyan-100 -z-10 -top-8 -right-20"></div>
          <p className="text-xl font-bold">WHO WE ARE</p>
          <p>
            Welcome to our About Us page! We are delighted to introduce
            ourselves and provide you with some insights into who we are and
            what we do.
          </p>
        </div>
      </h1>
    </Layout>
  );
};

export default About;
