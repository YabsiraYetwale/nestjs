import { Company } from "@/models/company";
import React from "react";

interface Props {
  company: Company;
}

const CompanyAbout = ({ company}: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-xl">
        About, <span className="font-bold text-gray-600">{company?.name}</span>
      </p>
      <p className="text-[15px] text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent arcu
        diam, varius eget efficitur ut, lobortis sed nisi. Nunc molestie sapien
        convallis dolor venenatis, et iaculis massa tincidunt. Ut tempor, sem eu
        porttitor posuere, sapien nisi accumsan tellus, eget bibendum nunc
        mauris vel lectus. Integer libero quam, sagittis non euismod a, aliquam
        nec tellus. Integer non ipsum lorem. Aliquam erat volutpat. Praesent
        lobortis nisl at felis malesuada mattis. Phasellus tellus diam, posuere
        non quam sed, dictum egestas tortor. Nunc ac semper nisi, at ornare leo.
        Maecenas lobortis tellus eget elit rhoncus blandit. Quisque consequat
        sapien quam, nec tempus neque maximus a. Donec id ullamcorper lacus.
        Nullam ex turpis, commodo aliquam purus ac, euismod dapibus est. Aliquam
        efficitur ac quam non rutrum. Nunc eu lobortis velit, eu venenatis urna.
        Donec aliquet ante felis, vel pulvinar risus ultrices quis.
      </p>
    </div>
  );
};

export default CompanyAbout;
