import React from "react";
import Loader from "@/components/loading";

type Props = {};

function Loading({}: Props) {
  return <Loader message="Fetching about page please wait" />;
}

export default Loading;
