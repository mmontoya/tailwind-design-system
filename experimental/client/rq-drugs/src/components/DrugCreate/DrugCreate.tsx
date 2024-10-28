import React, { useState } from "react";
import { QueryClient, useQuery, useMutation } from "react-query";
import { createDrug } from "../../lib/api";

interface ComponentProps {
  setState: (state: boolean) => void;
}

const queryClient = new QueryClient();

const DrugCreate: React.FC<ComponentProps> = ({ setState }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    active_ingredient: "",
    dose_form: "",
    strength: "",
    route_of_administration: "",
    manufacturer: "",
    approval_date: "",
    category: "",
    side_effects: "",
    storage_instructions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(false);
    if (formData.name != "") {
      createMutation.mutate(formData);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const createMutation = useMutation(createDrug, {
    onSuccess: () => {
      queryClient.invalidateQueries("drugs");
      // get documentId of newly created item and navigate there
    },
  });
  return (
    <div
      className="w-screen h-screen flex gap-2 justify-center items-center"
      onClick={() => console.log("Modal clicked")}
    >
      <div
        className="p-8 bg-white rounded-lg shadow-xl"
        onClick={handleModalClick}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={"Aspirin"}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder={"Bayer"}
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder={"OTC"}
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="active_ingredient">Active Ing.:</label>
            <input
              type="text"
              id="active_ingredient"
              name="active_ingredient"
              placeholder={"Acetylsalicylic Acid"}
              value={formData.active_ingredient}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="dose_form">Dose Form:</label>
            <input
              type="text"
              id="dose_form"
              name="dose_form"
              placeholder={"Tablet"}
              value={formData.dose_form}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="strength">Strength:</label>
            <input
              type="text"
              id="strength"
              name="strength"
              placeholder={"500 mg"}
              value={formData.strength}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="route_of_administration">Administration:</label>
            <input
              type="text"
              id="route_of_administration"
              name="route_of_administration"
              placeholder={"Oral"}
              value={formData.route_of_administration}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="route_of_administration">Manufacturer:</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              placeholder={"Bayer AG"}
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="approval-date">Approval Date:</label>
            <input
              type="text"
              id="approval_date"
              name="approval_date"
              placeholder={"yyyy-mm-dd"}
              value={formData.approval_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder={"Pain Reliever"}
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="side_effects">Side Effects:</label>
            <input
              type="text"
              id="side_effects"
              name="side_effects"
              placeholder={"Nausea, bleeding, rash"}
              value={formData.side_effects}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-2">
            <label htmlFor="storage_instructions">Storage Ins.:</label>
            <input
              type="text"
              id="storage_instructions"
              name="storage_instructions"
              placeholder={"Store in a cool, dry place."}
              value={formData.storage_instructions}
              onChange={handleChange}
            />
          </div>

          <button
            id="submit"
            type="submit"
            className="bg-signatureRed hover:bg-signatureRedLighter text-white p-4 rounded-lg mt-2"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default DrugCreate;
