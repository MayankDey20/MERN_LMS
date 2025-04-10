import React, { useEffect, useState } from "react";
import CourseTiles from "../componets/CourseTiles";
import { useAuthContext } from "../hooks/useAuthContext";
import { useChapterContext } from "../hooks/useChapterContext";
import hand from "../img/icons/hand.png";
import Layout from "../componets/Layout/Layout";
import "../index.css";

const Dashboard = () => {
  const { chapters, dispatch } = useChapterContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchChapters = async () => {
      const url =
        user.role === "Admin"
          ? "http://localhost:4000/api/chapters/"
          : "http://localhost:4000/api/chapters/st";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CHAPTERS", payload: json });
        setLoading(false);
      }
    };

    if (user) {
      fetchChapters();
    }
  }, [dispatch, user]);

  return (
    <Layout>
      <div className="flex flex-col mx-2 lg:mx-10">
        <div>
          <h1 className="mt-10 ml-4 font-bold text-gray-500 md:mt-10">
            Hello {user.name}, Welcome back{" "}
          </h1>
          <div className="flex -mt-6">
            <h2 className="flex items-center ml-4 text-2xl font-black md:text-4xl">
              Your DashBoard Today
            </h2>
            <img
              src={hand}
              className="w-16 mb-10 ml-0 md:mb-6"
              alt="not found"
            />
          </div>
        </div>

        <div>
          <h2 className="mt-6 ml-4 text-xl font-bold">
            {user.role === "Admin" ? "Your Courses" : "All Courses"}
          </h2>
          <div className="flex border rounded-xl flex-wrap ml-0 md:-ml-6 w-full md:w-[85vw]">
            {chapters &&
              chapters.map((chapter) => (
                <CourseTiles key={chapter._id} chapter={chapter} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
