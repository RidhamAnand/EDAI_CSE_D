import React from "react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const LeaderBoard = () => {
  return (
    <div>
      {" "}
      <div className="flex justify-between gap-2  border-gray-300">
        <h2 className="text-lg font-bold text-wh mb-4">Leaderboard</h2>
        <LeaderboardIcon />
      </div>
      {/* Table Container with Bottom Border */}
      <div className="border-t border-gray-300">
        <table className="table-auto w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="font-bold p-2 text-left">Rank</th>
              <th className="font-bold p-2 text-left">Name</th>
              <th className="font-bold p-2 text-left">Volunteered</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-2">1</td>
              <td className="p-2">Ridham</td>
              <td className="p-2">5</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2">2</td>
              <td className="p-2">Shivani</td>
              <td className="p-2">8</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2">3</td>
              <td className="p-2">Vansh</td>
              <td className="p-2">7</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2">4</td>
              <td className="p-2">Vinit</td>
              <td className="p-2">4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
