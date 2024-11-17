import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDebounce } from "../../utils/debounce-hook";
import { fetchData, fetchDetails } from "../../api";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "../../components/AutoComplete";
import { generatePDF } from "../../utils/generatePDF";
import { generateExcel } from "../../utils/generateExcel";

type Option = {
  name: string;
  id: string;
};

export const ProjectProgressDetail = () => {
  const navigate = useNavigate();
  const [vendorOptions, setVendorOptions] = useState<Option[]>([]);
  const [debouncedcustomer, customer, setcustomer] = useDebounce<string>("", 500);
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);
  const [debouncedproject, project, setproject] = useDebounce<string>("", 500);
  const [natureOfWorkOptions, setNatureOfWorkOptions] = useState<Option[]>([]);
  const [debouncednatureOfWork, natureOfWork, setnatureOfWork] = useDebounce<string>("", 500);

  useEffect(() => {
    fetchSearchedVendor();
  }, [debouncedcustomer]);

  useEffect(() => {
    fetchSearchedProject();
  }, [debouncedproject]);

  useEffect(() => {
    fetchSearchedNatureOfWork();
  }, [debouncednatureOfWork]);

  const fetchSearchedVendor = async () => {
    if (customer) {
      const data = await fetchData("vendor", `?search=${customer}`, navigate);
      setVendorOptions(data?.rows.map((row: any) => ({ id: row.id, name: row.name })) || []);
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

  const handleVendorSelect = (value: Option | null) => {};
  const handleProjectSelect = (value: Option | null) => {};
  const handleNatureOfWorkSelect = (value: Option | null) => {};

  const handleDownloadPDF = async () => {
    const data: any = await fetchProjectProgressDetail();
    
    const headers = [
      [
        "Project ID",
        "Branch",
        "Vendor",
        "Work Order Date",
        "Work Completion Date",
        "Days",
        "(A) Civil Works",
        "(B) Fixture Works",
        "(C) Furniture Works",
        "(D) Plumbing Works",
        "(E) Re-Polishing Items",
        "Elevation Works",
        "Site Development",
        "Total Civil Average",
        "(F) Air Conditioning System",
        "(G) Computer System",
        "(H) Generator & UPS System",
        "(I) Lighting/Fixture",
        "(J) Security System/Wiring",
        "Switches & Sockets",
        "(K) Telephone System",
        "(L) Wiring/ Accessories",
        "Total Electric Average",
        "Total Average",
      ],
    ];
  
    const rows = data.map((item: any) => [
      item.id,
      `${item.branch} ${item.city}`,
      `${item.customer.name} ${item.customer.city}`,
      item.orderDate,
      item.completionDate,
      item.days,
      item.civilWorks,
      item.fixtureWorks,
      item.furnitureWorks,
      item.plumbingWorks,
      item.rePolishingItems,
      item.elevationWorks,
      item.siteDevelopment,
      item.totalCivilAverage,
      item.airConditioningSystem,
      item.computerSystem,
      item.generatorUpsSystem,
      item.lightingFixture,
      item.securitySystemWiring,
      item.switchesSockets,
      item.telephoneSystem,
      item.wiringAccessories,
      item.totalElectricAverage,
      item.totalAverage,
    ]);

    generatePDF(headers, rows);
  };

  const handleDownloadExcel = async () => {
    const data: any = await fetchProjectProgressDetail();
    const formattedData = data.map((item: any) => ({
      "Project ID": item.id,
      "Branch": `${item.branch} ${item.city}`,
      "Vendor": `${item.customer.name} ${item.customer.city}`,
      "Work Order Date": item.orderDate,
      "Work Completion Date": item.completionDate,
      "Days": item.days,
      "(A) Civil Works": item.civilWorks,
      "(B) Fixture Works": item.fixtureWorks,
      "(C) Furniture Works": item.furnitureWorks,
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
      "Switches & Sockets": item.switchesSockets,
      "(K) Telephone System": item.telephoneSystem,
      "(L) Wiring/ Accessories": item.wiringAccessories,
      "Total Electric Average": item.totalElectricAverage,
      "Total Average": item.totalAverage,
    }));  
    generateExcel(formattedData);
  };

  const fetchProjectProgressDetail = async () => {
    const data = await fetchDetails(
      `project/progress/details?customerId=0052&natureOfWork=Renovation`,
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
          id="vendor-autocomplete"
          renderInputProps={{
            label: "All",
            name: "customer",
            value: customer,
            onChange: ({ currentTarget }: any) => {
              setcustomer(currentTarget.value);
            },
            required: true,
          }}
          options={vendorOptions}
          onChange={(_, value) => handleVendorSelect(value)}
        />
        <Autocomplete
          id="project-autocomplete"
          renderInputProps={{
            label: "All",
            name: "project",
            value: project,
            onChange: ({ currentTarget }: any) => {
              setproject(currentTarget.value);
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
              setnatureOfWork(currentTarget.value);
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
          onClick={handleDownloadPDF}
          style={{ width: "200px", height: "50px" }}
        >
          Download PDF
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadExcel}
          style={{ width: "200px", height: "50px" }}
        >
          Download Excel
        </Button>
      </div>
    </div>
  );
};
