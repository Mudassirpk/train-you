"use client";
import AddVenue from "@/components/AddVenue";
import Venue from "@/components/Venues/Venue";
import Loading from "@/components/loading";
import { TVenue } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Venues() {
  const session = useSession();
  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["get-venues"],
    queryFn: async () =>
      await axios.get(`/api/venue?userId=${session.data?.user._id}`),
  });

  let venues: TVenue[] = [];

  if (isFetched && data) {
    venues = data.data.venues;
  }

  return (
    <section className="w-full p-4 h-screen overflow-y-scroll flex flex-col">
      <div className="w-full border-2 flex flex-col rounded-xl border-indigo-600 h-full">
        <div className="w-full flex px-4 py-2 border-b border-b-gray-300 justify-between items-center">
          <h2 className="text-2xl font-semibold text-indigo-600">Venues</h2>
          <AddVenue />
        </div>
        {isFetching ? (
          <Loading message="Fetching venues" />
        ) : (
          <div className="space-y-4 p-2 flex-1 overflow-y-scroll">
            {venues?.map((venue: TVenue) => {
              return <Venue key={venue._id} venue={venue} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
