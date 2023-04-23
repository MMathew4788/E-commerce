import React from "react"
import Layout from "../components/Layouts/Layout"
import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-2">
        <div className="text-5xl font-bold">404</div>
        <div className="text-2xl">Oops! Page not found</div>
        <Link to="/" className="p-4 bg-cyan-300 rounded-xl text-gray-800">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
