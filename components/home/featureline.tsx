export default function FeatureLine() {
  return (
    <section
      className={
        "w-full border-t border-b border-indigo-800 gap-1 md:grid-cols-1 md:py-2 mb-10 bg-gradient-to-r from-indigo-800 to-indigo-600 grid grid-cols-3 px-12 sm-lg:px-0"
      }
    >
      <div
        className={
          "h-[100px] flex flex-col p-2 items-center justify-center bg-white"
        }
      >
        <h3 className={"text-2xl text-indigo-800 font-bold"}>Latest Courses</h3>
        <p className={"text-indigo-600 text-center"}>
          Browse latest course on trending concepts
        </p>
      </div>
      <div
        className={
          "h-[100px] flex flex-col py-2 px-4 items-center justify-center bg-white"
        }
      >
        <h3 className={"text-2xl text-indigo-800 font-bold"}>Live Sessions</h3>
        <p className={"text-indigo-600 text-center"}>
          Clear your concepts through interactive sessions with you trainers.
        </p>
      </div>
      <div
        className={
          "h-[100px] flex flex-col p-2 items-center justify-center bg-white"
        }
      >
        <h3 className={"text-2xl text-indigo-800 font-bold"}>
          Interactive Events
        </h3>
        <p className={"text-indigo-600 text-center"}>
          Events keeping you up to date.
        </p>
      </div>
    </section>
  );
}
