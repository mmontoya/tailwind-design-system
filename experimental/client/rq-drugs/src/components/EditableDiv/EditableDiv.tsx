import React, { useState, useRef } from "react";
import { QueryClient, useMutation } from "react-query";
import { updateDrug } from "../../lib/api";
import { Drug } from "../../../../../server/strapi-cvs/types/globalTypes";

interface ComponentProps {
  text: string;
  attribrute: string;
  target: Drug;
}

const queryClient = new QueryClient();

const EditableDiv: React.FC<ComponentProps> = ({
  text,
  attribrute,
  target,
}) => {
  const [edit, setEdit] = useState<boolean>();
  const editableRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");

  const updateMutation = useMutation(updateDrug, {
    onSuccess: () => queryClient.invalidateQueries("drugs"),
  });

  const handleSave = () => {
    let value: string | null;

    if (editableRef.current) {
      value = editableRef.current.textContent;
      setValue(value || "");
      updateMutation.mutate({ ...target, [attribrute]: value });
    }
    setEdit(false);
  };

  return (
    <div
      ref={editableRef}
      className={`flex flex-row ${
        edit
          ? "text-white border border-gray-200 px-2 bg-indigo-900 rounded-md outline-none"
          : "text-black border border-transparent px-2"
      }`}
      contentEditable={edit}
      onBlur={() => {
        setEdit(false);
        handleSave();
      }}
      onMouseDown={() => setEdit(true)}
      suppressContentEditableWarning={true}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSave();
        }
      }}
    >
      {value || text}
    </div>
  );
};

export default EditableDiv;
