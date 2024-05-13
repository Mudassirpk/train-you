import { SiCoursera } from "react-icons/si";

export default function DashboardCard({
  title,
  stats,
  unit,
  date,
  stateSize,
}: {
  title: string;
  stats: number;
  unit?: {
    title: string;
    position: "right" | "left";
  };
  date?: string;
  stateSize?: string;
}) {
  return (
    <div className="p-4 border-2 border-indigo-600 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-indigo-600">{title}</p>
        <SiCoursera className="text-4xl text-indigo-300" />
      </div>
      <p
        className={`w-full text-${
          stateSize ? stateSize : "6xl"
        } font-bold text-indigo-800`}
      >
        {" "}
        {unit?.position === "left" ? unit?.title : null}
        {stats} {unit?.position === "right" ? unit?.title : null}
      </p>
      <p className="text-lg text-gray-700 my-2">{date}</p>
    </div>
  );
}
