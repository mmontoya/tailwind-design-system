import React from "react";
import EditableDiv from "../EditableDiv";
import { Drug } from "../../../../../server/strapi-cvs/types/globalTypes";

interface ComponentProps {
  text: string;
  label: string;
  attribute: string;
  target: Drug;
}

const EditableField: React.FC<ComponentProps> = ({
  text,
  label,
  attribute,
  target,
}) => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="text-gray-500">{label}</div>
      <EditableDiv text={text} attribrute={attribute} target={target} />
    </div>
  );
};

export default EditableField;
