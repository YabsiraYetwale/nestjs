import cities from "../cities";
import countires from "../countries";
import regions from "../regions";
import subcities from "../subcities";

export const dropDownInputs = [
  { label: "Country", value: "country", list: countires },
  { label: "Region", value: "region", list: regions },
  { label: "City", value: "city", list: cities },
  {
    label: "Subcity",
    value: "subcity",
    list: subcities,
  },
];

export const plainInputs = [
  { lable: "Company Name", value: "name", type: "text" },
  { lable: "Description", value: "description", type: "text" },
  { lable: "General Manager", value: "generalManager", type: "text" },
  { lable: "Company Number", value: "companyNumber", type: "text" },
  { lable: "Tin Number", value: "tinNumber", type: "text" },
  { lable: "House Number", value: "houseNumber", type: "text" },
  { lable: "P.O. Box", value: "poBox", type: "text" },
  { lable: "Fax", value: "fax", type: "text" },
  { lable: "Company Email", value: "email", type: "text" },
  { lable: "Phone Number", value: "tel1", type: "number" },
  { lable: "Optional Phone Number", value: "tel2", type: "number" },
];
