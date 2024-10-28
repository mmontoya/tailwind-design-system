import React from "react";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useMutation } from "react-query";
import { type Drug } from "../../../../../server/strapi-cvs/types/globalTypes";
import { getDrug } from "../../lib/api";
import EditableField from "../EditableField/EditableField";
import { deleteDrug } from "../../lib/api";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const locale = "en-US";

  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDate = formatter.format(date);
  return formattedDate;
};

const DrugDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const deleteMutation = useMutation(deleteDrug, {
    onSuccess: () => {
      queryClient.invalidateQueries("drugs");
      navigate("/");
    },
  });

  const {
    data: drug,
    error,
    isLoading,
  } = useQuery<Drug>(["drug", id], async () => getDrug(id as string), {
    enabled: !!id,
  });

  if (!id) {
    return <p>No ID provided</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {(error as Error).message}</p>;
  }
  return (
    <>
      {drug && (
        <div className="flex justify-center w-full">
          <div className="flex flex-col align-middle mt-12">
            <div>
              {
                <>
                  <div className="flex flex-row text-2xl gap-2 items-center">
                    <div className="font-bold">{drug.name}</div>
                    <div className="font-light text-xl ml-1 text-blue-600">
                      ({drug.brand})
                    </div>
                  </div>
                  <EditableField
                    label="Class:"
                    text={drug.category}
                    attribute={"category"}
                    target={drug}
                  />
                  <EditableField
                    label="Dosage Form:"
                    text={drug.dose_form}
                    attribute={"dose_form"}
                    target={drug}
                  />
                  <EditableField
                    label="Manufacturer:"
                    text={drug.manufacturer}
                    attribute={"manufacturer"}
                    target={drug}
                  />
                  <EditableField
                    label="Administration:"
                    text={drug.route_of_administration}
                    attribute={"route_of_administration"}
                    target={drug}
                  />
                  <EditableField
                    label="Side Effects:"
                    text={drug.side_effects}
                    attribute={"side_effects"}
                    target={drug}
                  />
                  <EditableField
                    label="Storage Instruction:"
                    text={drug.storage_instructions}
                    attribute={"storage_instructions"}
                    target={drug}
                  />
                  <EditableField
                    label="Strength:"
                    text={drug.strength}
                    attribute={"strength"}
                    target={drug}
                  />
                  <EditableField
                    label="Type:"
                    text={drug.type}
                    attribute={"type"}
                    target={drug}
                  />
                  <EditableField
                    label="Approval Date:"
                    text={dateFormatter(drug.approval_date)}
                    attribute={"approval_date"}
                    target={drug}
                  />
                </>
              }
            </div>
            <div>
              <button
                className="bg-red-700 hover:bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => {
                  deleteMutation.mutate(drug);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrugDetail;
