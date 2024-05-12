"use client";

import React, { FormEvent, useState } from "react";
import Modal from "./modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { dataTagSymbol, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { uploadFiles } from "@/app/services/media/uploadFiles";
import Loading from "./loading";
import { TFileUploadResponse } from "@/app/services/media/uploadFiles";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import Message from "./message";
import { client } from "@/providers/queryprovider";

type Props = {};

function AddVenue({}: Props) {
  const session = useSession();
  const { toast } = useToast();

  const [error, setError] = useState<string | undefined>();
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const [venueData, setVenueData] = useState<{
    name: string;
    description: string;
    location: string;
    media: TFileUploadResponse[];
  }>({
    name: "",
    description: "",
    location: "",
    media: [],
  });

  const [media, setMedia] = useState<File[]>([]);

  const { mutate, status, data } = useMutation({
    mutationKey: ["create-venue"],
    mutationFn: async ({ media }: { media: TFileUploadResponse[] }) =>
      await axios.post(`/api/venue/add?userId=${session.data?.user._id}`, {
        ...venueData,
        media,
      }),
    onSuccess(data) {
      if (data?.data.success) {
        setError(undefined);
        setVenueData({ name: "", location: "", description: "", media: [] });
        client.invalidateQueries({ queryKey: ["get-venues"] });
        toast({
          title: "Add Venue",
          description: "Venue added successfully",
        });
      } else {
        setError(data?.data.message);
      }
    },
  });

  async function addVenue(e: FormEvent) {
    e.preventDefault();
    if (media.length > 0) {
      setUploadingMedia(true);
      const mediaUploaded = await uploadFiles(media);
      if (mediaUploaded) {
        setUploadingMedia(false);
        mutate({ media: mediaUploaded });
      }
    } else {
      mutate({ media: [] });
    }
  }

  return (
    <Modal
      close={data?.data.success}
      title="Add Venue"
      triggerTitle="Add Venue"
    >
      <form onSubmit={addVenue} className="space-y-4">
        <Label className="flex flex-col gap-2">
          <span>Name</span>
          <Input
            onChange={(e) =>
              setVenueData({ ...venueData, name: e.target.value })
            }
            required
            type="text"
            value={venueData.name}
            placeholder="e.g. John"
          />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Description</span>
          <Textarea
            onChange={(e) =>
              setVenueData({ ...venueData, description: e.target.value })
            }
            required
            placeholder="Venue's description"
            value={venueData.description}
          />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Location/Address</span>
          <Input
            onChange={(e) =>
              setVenueData({ ...venueData, location: e.target.value })
            }
            value={venueData.location}
            type="text"
            required
            placeholder="e.g. Downtown, Manhattan, Street 2"
          />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Media (Venues image/videos (optional))</span>
          <Input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setMedia(Array.from(e.target.files));
              }
            }}
          />
        </Label>
        <Button
          disabled={status === "pending" || uploadingMedia}
          type="submit"
          className={`bg-indigo-600 hover:bg-indigo-500 w-full disabled:bg-gray-300 disabled:text-black`}
        >
          {status === "pending" || uploadingMedia ? (
            <Loading
              message={
                uploadingMedia
                  ? "Uploading venue media"
                  : "Saving venue information"
              }
            />
          ) : (
            " Add Venue"
          )}
        </Button>
        {error ? <Message size="md" type="error" message={error} /> : null}
      </form>
    </Modal>
  );
}

export default AddVenue;
