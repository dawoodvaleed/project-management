import { FormEvent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDebounce } from "../../utils/debounce-hook";
import { fetchData } from "../../api";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "../../components/AutoComplete";
import { formatMuiDate } from "../../utils/util";
import { postData } from "../../api/postData";
import { TextField } from "../../components/TextField";

type Option = {
  name: string;
  id: string;
  rate?: string;
  unitOfMeasurement?: string;
  work?: string;
  customer?: string;
  branch?: string;
};

export const AddMeasurement = () => {
  const navigate = useNavigate();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);
  const [debouncedProjectCode, projectCode, setProjectCode] =
    useDebounce<string>("", 500);
  const [itemOptions, setItemOptions] = useState<Option[]>([]);
  const [debouncedItemCode, itemCode, setItemCode] = useDebounce<string>(
    "",
    500
  );

  const [selectedItem, setSelectedItem] = useState<Option>();
  const [selectedProject, setSelectedProject] = useState<Option>();

  const initialValue = {
    projectId: "",
    itemId: "",
    date: formatMuiDate(new Date()),
    description: "",
    length: "",
    height: "",
    breadth: "",
    numberOfItems: "",
    location: "",
    rate: null,
  };

  const [measurementData, setMeasurementData] = useState(initialValue);
  const {
    date,
    description,
    length,
    height,
    breadth,
    numberOfItems,
    location,
    projectId,
  } = measurementData;

  const onChange = ({ currentTarget: { name, value } }: any) => {
    const changeData: any = { [name]: value };
    if (name === "itemId") {
      const selectedItem = itemOptions.find(
        (itemOption) => itemOption.id === value
      );
      changeData.rate = selectedItem?.rate;
      changeData.length = "";
      changeData.height = "";
      changeData.breadth = "";
      setSelectedItem(selectedItem);
    } else if (name === "projectId") {
      const selectedProject = projectOptions.find(
        (projectOption) => projectOption.id === value
      );
      setSelectedProject(selectedProject);
    }
    setMeasurementData({
      ...measurementData,
      ...changeData,
    });
  };

  const fetchSearchedProjects = async () => {
    if (projectCode) {
      const data = await fetchData(
        "project",
        `?search=${projectCode}`,
        navigate
      );
      setProjectOptions(
        data?.rows.map((row: any) => ({
          id: row.id,
          name: `${row.id} - ${row.branch}`,
          customer: row.customer.name,
          branch: row.branch,
        })) || []
      );
    }
  };

  const fetchSearchedItems = async () => {
    if (itemCode) {
      const data = await fetchData("item", `?search=${itemCode}`, navigate);
      setItemOptions(
        data?.rows.map((row: any) => ({
          id: row.id,
          name: `${row.id} - ${row.work}`,
          rate: row.price,
          unitOfMeasurement: row.unitOfMeasurement,
          work: row.work,
        })) || []
      );
    }
  };

  useEffect(() => {
    fetchSearchedProjects();
  }, [debouncedProjectCode]);

  useEffect(() => {
    fetchSearchedItems();
  }, [debouncedItemCode]);

  const saveData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await postData("measurement", measurementData, navigate);
      setMeasurementData(initialValue);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Measurement</h2>
      <form onSubmit={saveData}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Autocomplete
            id="project-autocomplete"
            renderInputProps={{
              label: "Project",
              name: "projectCode",
              value: projectCode,
              onChange: ({ currentTarget }: any) => {
                setProjectCode(currentTarget.value);
              },
              required: true,
            }}
            options={projectOptions}
            onChange={(_, value) => {
              onChange({
                currentTarget: {
                  name: "projectId",
                  value: value?.id || null,
                },
              });
            }}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            onChange={onChange}
            value={date}
            required
            sx={{ flex: 1, marginRight: "20px" }}
          />
          <strong style={{ marginRight: "20px", flex: 1 }}>
            Customer: {selectedProject?.customer || ""}
          </strong>
          <strong style={{ marginRight: "20px", flex: 1 }}>
            Branch: {selectedProject?.branch || ""}
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Autocomplete
            id="item-autocomplete"
            renderInputProps={{
              label: "Item",
              name: "itemCode",
              value: itemCode,
              onChange: ({ currentTarget }: any) => {
                setItemCode(currentTarget.value);
              },
              required: true,
            }}
            options={itemOptions}
            onChange={(_, value) => {
              onChange({
                currentTarget: { name: "itemId", value: value?.id },
              });
            }}
          />
          <strong style={{ marginRight: "20px", flex: 1 }}>
            Rate: {selectedItem?.rate || ""}
          </strong>
          <strong style={{ marginRight: "20px", flex: 1 }}>
            Unit: {selectedItem?.unitOfMeasurement || ""}
          </strong>
          <strong style={{ marginRight: "20px", flex: 1 }}>
            Work: {selectedItem?.work || ""}
          </strong>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            name="length"
            label="Length"
            type="number"
            onChange={onChange}
            value={length}
            disabled={
              !(
                selectedItem?.unitOfMeasurement === "rft" ||
                selectedItem?.unitOfMeasurement === "sft"
              )
            }
          />
          <TextField
            name="height"
            label="Height"
            type="number"
            onChange={onChange}
            value={height}
            disabled
          />
          <TextField
            name="breadth"
            label="Breadth"
            type="number"
            onChange={onChange}
            value={breadth}
            disabled={!(selectedItem?.unitOfMeasurement === "sft")}
          />
          <TextField
            name="numberOfItems"
            label="NOS"
            type="number"
            onChange={onChange}
            value={numberOfItems}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            name="location"
            label="Location"
            type="text"
            onChange={onChange}
            value={location}
            required
          />
          <TextField
            name="description"
            label="Description"
            type="text"
            onChange={onChange}
            value={description}
            required
          />
        </div>

        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};
