"use client";

import Image from "next/image";
import { useLanyard } from "react-use-lanyard";

export default function ActivityCard({ userId }: { userId: string }) {
  const { data } = useLanyard({
    userId,
  });

  const activities = data?.data?.activities;
  if (!data) {
    return (
      <p className="font-mono opacity-80 text-xs leading-tight tracking-tight">
        Loading activity <span className="dot dot-1">.</span>
        <span className="dot dot-2">.</span>
        <span className="dot dot-3">.</span>
      </p>
    );
  }

  return (
    <>
      {activities?.map((activity) => (
        <div key={activity.id} className="w-full max-w-2xl mx-auto">
          <div className="rounded-lg flex py-2 pl-2 -mx-1 bg-neutral-800/40 items-center gap-2">
            <div className=" h-14 w-auto aspect-square rounded-[0.25rem] overflow-hidden">
              <Image
                height={5000}
                width={5000}
                alt={activity.name}
                className="  h-full w-full object-cover "
                src={
                  activity?.assets?.large_image?.startsWith("mp:external")
                    ? activity?.assets?.large_image?.includes("%3Furl%3Dhttps")
                      ? `https://wsrv.nl/?url=${decodeURIComponent(
                          activity?.assets?.large_image?.match(
                            /%3Furl%3D(https%3A%2F%2Flh3\.googleusercontent\.com%2F[^/]+)/ // Match until the first '/' after 'lh3.googleusercontent.com/'
                          )?.[1] || ""
                        )}`
                      : `https://${activity?.assets?.large_image
                          .split("/https/")
                          .pop()}`
                    : `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.large_image}.png`
                }
                onError={(e) => {
                  e.currentTarget.src =
                    "https://i.pinimg.com/736x/b1/ca/d0/b1cad057c645ee9a5755304b99b37117.jpg";
                }}
              />
            </div>
            <div>
              <h2 className="font-semibold text-xs">{activity.name}</h2>
              <p className=" text-neutral-100/90 font-medium text-xs max-w-md truncate ">
                {activity.details}
              </p>
              <p className="text-neutral-100/70 font-medium  text-xs ">
                {activity.state}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
