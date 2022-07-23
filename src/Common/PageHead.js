import React from "react";
import { Helmet } from "react-helmet";

export default function PageHead({ title, description }) {
  return (
    <Helmet>
      <title>{title || "Switchboard"}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
