import React from "react";
import Layout from "../components/Layouts/Layout";

const Contact = () => {
  return (
    <Layout>
      <h1 className="relative flex flex-col items-center justify-center space-y-6 mt-28 px-4">
        <h1 className="text-xl font-bold">Contact Us</h1>
        <div className="relative text-center p-5 border w-[20rem] bg-cyan-300">
          <div className="absolute w-[10rem] h-[10rem] bg-cyan-500 rounded-full -z-10 top-20 -left-12"></div>
          <div className="absolute w-[20rem] h-[11rem] bg-cyan-100 -z-10 -top-8 -right-20"></div>

          <p>
            We're thrilled that you're interested in getting in touch with us.
            Whether you have a question, feedback, or a business inquiry, we're
            here to assist you. Please find our contact information below, and
            feel free to reach out to us through your preferred method.
          </p>
        </div>
      </h1>
    </Layout>
  );
};

export default Contact;
