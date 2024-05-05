"use client";
import Loading from "@/components/loading";
import Modal from "@/components/modal";
import EditSkills from "@/components/profile/EditSkills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const [personalInformation, setPersonalInformation] = useState({
    name: "",
    phone: "",
  });

  const [education, setEducation] = useState({
    degree: "",
    major: "",
    institute: "",
  });

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: async () => axios.get("/api/auth/get-user"),
  });

  let user: any;
  if (isFetched && data && data.data.success) {
    user = data.data.user;
  }

  useEffect(() => {
    if (user) {
      setPersonalInformation({
        name: user.name,
        phone: user.phone,
      });
    }
  }, [user]);

  return (
    <main className={`flex-1 h-screen py-4 pr-4`}>
      <section className="w-full flex flex-col h-full p-2 rounded-lg border-2 border-indigo-600">
        <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
          Edit Profile
        </h1>
        <Separator className="my-2" />
        {isFetching ? (
          <Loading message="Fetching user information" />
        ) : (
          <div className="w-full p-4 flex-1 overflow-y-scroll">
            <form>
              <p className="text-xl font-semibold text-gray-700">
                Personal Information
              </p>
              <div className="w-full my-2 space-y-4">
                <Label className="flex flex-col gap-2">
                  <span>Name</span>
                  <Input
                    value={personalInformation.name}
                    onChange={(e) =>
                      setPersonalInformation({
                        ...personalInformation,
                        name: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Label>
              </div>
              <div className="w-full my-2">
                <Label className="flex flex-col gap-2">
                  <span>Phone</span>
                  <Input
                    value={personalInformation.phone}
                    onChange={(e) =>
                      setPersonalInformation({
                        ...personalInformation,
                        phone: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Label>
              </div>
              <p className="text-xl font-semibold text-gray-700">Education</p>
              <div className="w-full my-2">
                <Label className="flex flex-col gap-2">
                  <span>Degree</span>
                  <Input
                    value={education.degree}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        degree: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Label>
              </div>{" "}
              <div className="w-full my-2">
                <Label className="flex flex-col gap-2">
                  <span>Major</span>
                  <Input
                    value={education.major}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        major: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Label>
              </div>
              <div className="w-full my-2">
                <Label className="flex flex-col gap-2">
                  <span>Institute</span>
                  <Input
                    value={education.institute}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        institute: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Label>
              </div>
              <Button
                type="submit"
                className="my-2 w-full bg-indigo-600 hover:bg-indigo-500"
              >
                Save Changes
              </Button>
            </form>
            {user.details.skills ? (
              <EditSkills skills={user.details.skills} />
            ) : null}
          </div>
        )}
      </section>
    </main>
  );
}
