"use client";

import { useState } from "react";
import Modal from "../modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Dropdown from "../dropdown";
import { TVenue } from "@/types/types";
import Loading from "../loading";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

type Props = {};

function AddEvent({}: Props) {
  const session = useSession();
  const { toast } = useToast();

  const [eventData, setEventData] = useState<{
    title: string;
    description: string;
    type: "online" | "physical";
    timestamps: {
      from: string;
      to: string;
    };
    links: string[];
    venue: string;
    members: string[];
  }>({
    title: "",
    description: "",
    type: "online",
    timestamps: {
      from: "",
      to: "",
    },
    links: [],
    venue: "",
    members: [],
  });

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["get-user-venues"],
    queryFn: async () =>
      await axios.get(`/api/venue?userId=${session.data?.user._id}`),
    enabled: eventData.type === "physical",
    refetchOnWindowFocus: false,
  });

  let venues: TVenue[] = [];

  if (isFetched && data) venues = data.data.venues;

  const {
    mutate,
    status,
    data: mutationData,
  } = useMutation({
    mutationKey: ["add-mutation"],
    mutationFn: async () =>
      await axios.post(
        `/api/event/add?userId=${session.data?.user._id}`,
        eventData
      ),
    onSuccess(data) {
      if (data?.data.success) {
        setEventData({
          title: "",
          description: "",
          type: "online",
          timestamps: {
            from: "",
            to: "",
          },
          links: [],
          venue: "",
          members: [],
        });
        toast({
          title: "Add Event",
          description: "Event added successfully",
        });
      }
    },
  });

  return (
    <Modal
      title="Add Event"
      triggerTitle="Add Event"
      close={mutationData?.data.success}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="space-y-4"
      >
        <Label className="flex flex-col gap-2">
          <span>Title</span>
          <Input
            required
            type="text"
            value={eventData.title}
            onChange={(e) => {
              setEventData({ ...eventData, title: e.target.value });
            }}
            placeholder="e.g. Welcome event"
          />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Description</span>
          <Textarea
            required
            value={eventData.description}
            onChange={(e) => {
              setEventData({ ...eventData, description: e.target.value });
            }}
            placeholder="e.g. Event's description"
          />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Type</span>
          <RadioGroup
            className="mt-2 flex gap-4 items-center"
            defaultValue={"online"}
            onValueChange={(value) => {
              setEventData({
                ...eventData,
                type: value as "online" | "physical",
              });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="r1" />
              <Label htmlFor="r1">Online</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="physical" id="r2" />
              <Label htmlFor="r1">Physical</Label>
            </div>
          </RadioGroup>
        </Label>
        {eventData.type === "online" ? (
          <Label className="flex flex-col gap-2">
            <span>Meeting Links (add multiple links separated by space)</span>
            <Input
              onChange={(e) => {
                const links = e.target.value.split(" ");
                setEventData({ ...eventData, links });
              }}
              value={eventData.links.join(" ")}
              required
              type="text"
              placeholder="e.g. https://google.meet.com/your-meeting-id https://zoom.com/your-meeting-id"
            />
          </Label>
        ) : isFetching ? (
          <Loading message="Loading venues" />
        ) : (
          <Label className="flex flex-col gap-2">
            <span>Choose venue for a physical event</span>
            <Dropdown
              onSelect={(option: string) => {
                const venueId = venues.find(
                  (venue) => venue.name === option
                )?._id;
                if (venueId) {
                  setEventData({ ...eventData, venue: venueId });
                }
              }}
              triggerTitle="Choose Venue"
              options={venues.map((venue: TVenue) => venue.name)}
            />
          </Label>
        )}

        <div className="w-full flex gap-2 items-center">
          <Label className="flex w-[50%] flex-col gap-2">
            <span>From</span>
            <Input
              value={eventData.timestamps.from}
              onChange={(e) => {
                setEventData({
                  ...eventData,
                  timestamps: { ...eventData.timestamps, from: e.target.value },
                });
              }}
              required
              type="date"
              placeholder="e.g. https://google.meet.com/your-meeting-id https://zoom.com/your-meeting-id"
            />
          </Label>
          <Label className="flex w-[50%] flex-col gap-2">
            <span>To</span>
            <Input
              min={eventData.timestamps.from}
              value={eventData.timestamps.to}
              onChange={(e) => {
                setEventData({
                  ...eventData,
                  timestamps: { ...eventData.timestamps, to: e.target.value },
                });
              }}
              required
              type="date"
              placeholder="e.g. https://google.meet.com/your-meeting-id https://zoom.com/your-meeting-id"
            />
          </Label>
        </div>
        <Label className="flex flex-col gap-2">
          <span>
            Invites (emails of members to invite in an event separated by space)
          </span>
          <Input
            onChange={(e) => {
              const members = e.target.value.split(" ");
              setEventData({ ...eventData, members });
            }}
            value={eventData.members.join(" ")}
            required
            type="text"
            placeholder="e.g. member-one@gmail.com member-two@gmail.com"
          />
        </Label>

        <Button
          disabled={status === "pending"}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-300 disabled:text-gray-800"
        >
          {status === "pending" ? (
            <Loading message="Creating event please wait" />
          ) : (
            "Add Event"
          )}
        </Button>
      </form>
    </Modal>
  );
}

export default AddEvent;
