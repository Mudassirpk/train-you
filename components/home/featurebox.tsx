import Image from "next/image";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ChatIcon from "@mui/icons-material/Chat";
export default function FeatureBox() {
  return (
    <section
      className={"w-full px-12 md:px-4 py-6 md:flex-col flex items-center"}
    >
      <div
        className={
          "w-[50%] md:w-full relative md:h-auto md:aspect-square h-[400px]"
        }
      >
        <Image
          src={"/feature-box-image.jpg"}
          objectFit={"contain"}
          alt={"a happy student learning something on a laptop."}
          fill={true}
        />
      </div>
      <div className="w-[50%] md:w-full space-y-4 md:space-x-0 md:pl-0 pl-8">
        <div className={"w-full flex gap-2 items-start justify-start"}>
          <WorkspacePremiumIcon className={"text-[50px] text-indigo-800"} />
          <div>
            <p className={"font-bold text-indigo-800"}>
              Earn Live Certificates
            </p>
            <p className={"text-indigo-400"}>
              Get you digital certificate by the completion of your training.
            </p>
          </div>
        </div>
        <div className={"w-full flex gap-2 items-start"}>
          <VideoCameraFrontIcon className={"text-[50px] text-indigo-800"} />
          <div>
            <p className={"font-bold text-indigo-800"}>Live Sessions</p>
            <p className={"text-indigo-400"}>
              Interact with your trainers in live sessions.
            </p>
          </div>
        </div>
        <div className={"w-full flex gap-2 items-start"}>
          <ViewCompactIcon className={"text-[50px] text-indigo-800"} />
          <div>
            <p className={"font-bold text-indigo-800"}>
              Well Organized Courses
            </p>
            <p className={"text-indigo-400"}>
              Courses organized to your own pace.
            </p>
          </div>
        </div>
        <div className={"w-full flex gap-2 items-start"}>
          <ChatIcon className={"text-[50px] text-indigo-800"} />
          <div>
            <p className={"font-bold text-indigo-800"}>Feedbacks and Reviews</p>
            <p className={"text-indigo-400"}>
              Give feedbacks to the trainers and provides reviews to make things
              better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
