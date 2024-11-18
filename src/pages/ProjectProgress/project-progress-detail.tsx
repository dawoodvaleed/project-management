import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDebounce } from "../../utils/debounce-hook";
import { fetchData, fetchDetails } from "../../api";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "../../components/AutoComplete";
import { generatePDF } from "../../utils/generatePDF";
import { generateExcel } from "../../utils/generateExcel";
import {formatDate} from "../../utils/util";

type Option = {
  name: string;
  id: string;
};

const formatPercentage = (completedPercentage: string = "0", totalProgressPercentage: string = "0") => {
  const completed = parseFloat(completedPercentage);
  const total = parseFloat(totalProgressPercentage);

  let status = "No Work";
  if (completed > 0) {
    status = completed < total ? "In Progress" : "Completed";
  }

  return `${status} 
(${completedPercentage} / ${totalProgressPercentage})%`;
};

export const ProjectProgressDetail = () => {
  const navigate = useNavigate();
  const [customerOptions, setCustomerOptions] = useState<Option[]>([]);
  const [debouncedCustomer, customer, setCustomer] = useDebounce<string>("");
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);
  const [debouncedProject, project, setProject] = useDebounce<string>("");
  const [natureOfWorkOptions, setNatureOfWorkOptions] = useState<Option[]>([]);
  const [debouncedNatureOfWork, natureOfWork, setNatureOfWork] = useDebounce<string>("");

  useEffect(() => {
    fetchSearchedCustomer();
  }, [debouncedCustomer]);

  useEffect(() => {
    fetchSearchedProject();
  }, [debouncedProject]);

  useEffect(() => {
    fetchSearchedNatureOfWork();
  }, [debouncedNatureOfWork]);

  const fetchSearchedCustomer = async () => {
    if (customer) {
      const data = await fetchData("customer", `?search=${customer}`, navigate);
      setCustomerOptions(data?.rows.map((row: any) => ({ id: row.id, name: row.name })) || []);
    }
  };

  const fetchSearchedProject = async () => {
    if (project) {
      const data = await fetchData("project", `?search=${project}`, navigate);
      setProjectOptions(data?.rows.map((row: any) => ({ id: row.id, name: `${row.id} - ${row.branch}` })) || []);
    }
  };

  const fetchSearchedNatureOfWork = async () => {
    if (natureOfWork) {
      const data = await fetchData("natureOfWork", `?search=${natureOfWork}`, navigate);
      setNatureOfWorkOptions(data?.rows.map((row: any) => ({ id: row.id, name: row.name })) || []);
    }
  };

  const handleCustomerSelect = (value: Option | null) => {
    setCustomer(value?.id || "");
  };
  const handleProjectSelect = (value: Option | null) => {setProject(value?.id || ""); };
  const handleNatureOfWorkSelect = (value: Option | null) => { };

  const handleDownload = async (fileType: string) => {
    const data: any = await fetchProjectProgressDetail();

    const formattedData = data.map((item: any) => ({
      "Project ID": item.id,
      "Branch": `${item.branch} ${item.city}`,
      "Customer": `${item.customer.name} ${item.customer.city}`,
      "Work Order Date": formatDate(item.orderDate),
      "Work Completion Date": formatDate(item.completionDate),
      "Days": item.orderDate ? Math.round((+new Date()- +new Date(item?.orderDate)) / (1000 * 60 * 60 * 24)) : "",
      "(A) Civil Works": formatPercentage(item.projectProgress?.["(A) Civil Works"]?.completedPercentage, item.projectProgress?.["(A) Civil Works"]?.totalProgressPercentage),
      "(B) Fixture Works": formatPercentage(item.projectProgress?.["(B) Fixture Works"]?.completedPercentage, item.projectProgress?.["(B) Fixture Works"]?.totalProgressPercentage),
      "(E) Electric Works": formatPercentage(item.projectProgress?.["(E) Electric Works"]?.completedPercentage, item.projectProgress?.["(E) Electric Works"]?.totalProgressPercentage),
      "(D) Plumbing Works": item.plumbingWorks,
      "(E) Re-Polishing Items": item.rePolishingItems,
      "Elevation Works": item.elevationWorks,
      "Site Development": item.siteDevelopment,
      "Total Civil Average": item.totalCivilAverage,
      "(F) Air Conditioning System": item.airConditioningSystem,
      "(G) Computer System": item.computerSystem,
      "(H) Generator & UPS System": item.generatorUpsSystem,
      "(I) Lighting/Fixture": item.lightingFixture,
      "(J) Security System/Wiring": item.securitySystemWiring,
      "Switches & Sockets": formatPercentage(item.projectProgress?.["Switches & Sockets"]?.completedPercentage, item.projectProgress?.["Switches & Sockets"]?.totalProgressPercentage),
      "(K) Telephone System": item.telephoneSystem,
      "(L) Wiring/ Accessories": item.wiringAccessories,
      "Total Electric Average": item.totalElectricAverage,
      "Total Average": `${item.projectProgress?.totalAverage}%` || "N/A",
    }));

    const headers = formattedData.length ? [Object.keys(formattedData[0])] : [];
    const rows = formattedData.map((row :any) => Object.values(row));

    if (fileType === 'pdf') {
      generatePDF(headers, rows);
    } else if (fileType === 'xlsx') {
      generateExcel(formattedData);
    }
  };

  const fetchProjectProgressDetail = async () => {
    let params = '';
    [{ name: 'customerId', value: customer }, { name: 'natureOfWork', value: natureOfWork }, { name: 'projectId', value: project }].forEach(({ name, value }) => {
      if (value) {
        params += `${params ? '&' : '?'}${name}=${value}`
      }
    })
    const data = await fetchDetails(
      `project/progress/details${params}`,
      navigate
    );

    return data;
  };

  return (
    <div className="container">
      <h2>Project Progress Details</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Autocomplete
          id="customer-autocomplete"
          renderInputProps={{
            label: "All",
            name: "customer",
            value: customer,
            onChange: ({ currentTarget }: any) => {
              setCustomer(currentTarget.value);
            },
            required: true,
          }}
          options={customerOptions}
          onChange={(_, value) => handleCustomerSelect(value)}
        />
        <Autocomplete
          id="project-autocomplete"
          renderInputProps={{
            label: "All",
            name: "project",
            value: project,
            onChange: ({ currentTarget }: any) => {
              setProject(currentTarget.value);
            },
            required: true,
          }}
          options={projectOptions}
          onChange={(_, value) => handleProjectSelect(value)}
        />
        <Autocomplete
          id="natureOfWork-autocomplete"
          renderInputProps={{
            label: "All",
            name: "natureOfWork",
            value: natureOfWork,
            onChange: ({ currentTarget }: any) => {
              setNatureOfWork(currentTarget.value);
            },
            required: true,
          }}
          options={natureOfWorkOptions}
          onChange={(_, value) => handleNatureOfWorkSelect(value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleDownload('pdf')}
          style={{ width: "200px", height: "50px" }}
        >
          Download PDF
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDownload('xlsx')}
          style={{ width: "200px", height: "50px" }}
        >
          Download Excel
        </Button>
      </div>
    </div>
  );
};
