import React, { useState } from "react";
import { useQuery } from "react-query";
import { Drug } from "../../../../../server/strapi-cvs/types/globalTypes";
import { getDrugs } from "../../lib/api";
import { Link } from "react-router-dom";
import RoundButton from "../RoundButton";
import Modal from "../Modal";
import DrugCreate from "../DrugCreate";
import { Button } from "@/components/ui/button";

function DrugList() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { data: drugs } = useQuery<Drug[]>(
    "drugs",
    getDrugs,

    {
      initialData: [],
    }
  );

  return (
    <div className="flex justify-center items-end w-full">
      <div className="flex flex-col">
        {drugs?.map((drug) => (
          <div className="mr-7 text-sm text-blue-800" key={drug.id}>
            <Link to={`/${drug.documentId}`} key={drug.id}>
              <span className="font-bold">{drug.name}</span>
              <span className="font-thin ml-1">({drug.brand})</span>
            </Link>
          </div>
        ))}
      </div>
      <Modal
        state={modalIsOpen}
        setState={setModalIsOpen}
        component={<DrugCreate setState={setModalIsOpen} />}
      />
      <div className="ml-[-50px] mb-[-30px]">
        <RoundButton setState={setModalIsOpen} />
      </div>
      <div>
        <Button variant={"default"} size={"lg"}>
          Click me
        </Button>
      </div>
    </div>
  );
}

export default DrugList;
