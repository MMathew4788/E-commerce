import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2"
        />
        <button
          type="submit"
          className="px-4 py-2 text-gray-200 hover:text-cyan-300 bg-gray-800 border rounded-xl text-sm flex items-center justify-center font-semibold"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
