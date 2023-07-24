import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Collapse,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
  Close as CloseIcon,
} from "@mui/icons-material";

const DepartmentListComponent = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [expandedDepartments, setExpandedDepartments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hardcoded JSON data for departments and sub-departments
  const departmentData = [
    {
      id: 1,
      name: "Customer Service",
      subDepartments: [
        { id: 11, name: "Support" },
        { id: 12, name: "Customer Sucess" },
      ],
    },
    {
      id: 2,
      name: "Design",
      subDepartments: [
        { id: 21, name: "Graphic Design" },
        { id: 22, name: "Product Design" },
        { id: 23, name: "Web Design" },
      ],
    },
    {
      id: 3,
      name: "Department 3",
      subDepartments: [
        { id: 31, name: "Sub Department 3.1" },
        { id: 32, name: "Sub Department 3.2" },
      ],
    },
  ];

  const handleDepartmentSelect = (departmentId) => {
    if (selectedDepartments.includes(departmentId)) {
      // Unselect the department and all its sub-departments
      setSelectedDepartments(
        selectedDepartments.filter((id) => id !== departmentId)
      );
    } else {
      // Select the department and all its sub-departments
      const selectedDepartment = departmentData.find(
        (department) => department.id === departmentId
      );
      if (selectedDepartment) {
        const subDepartmentIds = selectedDepartment.subDepartments.map(
          (subDepartment) => subDepartment.id
        );
        setSelectedDepartments((prevState) =>
          Array.from(new Set([...prevState, departmentId, ...subDepartmentIds]))
        );
      }
    }
  };

  const handleSubDepartmentSelect = (subDepartmentId) => {
    // Find the department that contains the sub-department
    const departmentWithSub = departmentData.find((department) =>
      department.subDepartments.some(
        (subDepartment) => subDepartment.id === subDepartmentId
      )
    );

    // Check if all sub-departments of the department are selected
    const allSubSelected = departmentWithSub.subDepartments.every(
      (subDepartment) => selectedDepartments.includes(subDepartment.id)
    );

    if (allSubSelected) {
      setSelectedDepartments(
        selectedDepartments.filter(
          (id) => !departmentWithSub.subDepartments.some((sub) => sub.id === id)
        )
      );
    } else {
      setSelectedDepartments([...selectedDepartments, subDepartmentId]);
    }

    // Select the parent department if all sub-departments are selected
    if (allSubSelected) {
      setSelectedDepartments((prevState) =>
        prevState.filter((id) => id !== departmentWithSub.id)
      );
    }
  };

  const handleDepartmentExpand = (departmentId) => {
    if (expandedDepartments.includes(departmentId)) {
      setExpandedDepartments(
        expandedDepartments.filter((id) => id !== departmentId)
      );
    } else {
      setExpandedDepartments([...expandedDepartments, departmentId]);
    }
  };

  const isDepartmentSelected = (departmentId) =>
    selectedDepartments.includes(departmentId);

  const isSubDepartmentSelected = (subDepartmentId) =>
    selectedDepartments.includes(subDepartmentId);

  const isDepartmentExpanded = (departmentId) =>
    expandedDepartments.includes(departmentId);

  const getSubDepartmentIndent = (depth) => {
    return `${16 * depth}px`; // 16px is the default padding-left for MUI ListItem
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ height: "100vh",width: "fit-content", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "8px" }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Departments
        </Typography>
        <IconButton aria-label="Menu" onClick={toggleSidebar}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      {sidebarOpen && (
        <div
          style={{ width: "fit-content", overflowY: "auto", padding: "8px" }}
        >
          <List>
            {departmentData.map((department) => (
              <div key={department.id}>
                <ListItem
                  disableGutters
                  sx={{ paddingLeft: getSubDepartmentIndent(0) }} // Indent department
                >
                  <Checkbox
                    checked={isDepartmentSelected(department.id)}
                    onChange={() => handleDepartmentSelect(department.id)}
                  />
                  <ListItemText primary={department.name} />
                  {isDepartmentExpanded(department.id) ? (
                    <IconButton
                      aria-label="Collapse"
                      size="small"
                      onClick={() => handleDepartmentExpand(department.id)}
                    >
                      <ExpandLess />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="Expand"
                      size="small"
                      onClick={() => handleDepartmentExpand(department.id)}
                    >
                      <ExpandMore />
                    </IconButton>
                  )}
                </ListItem>
                <Collapse
                  in={isDepartmentExpanded(department.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {department.subDepartments.map((subDepartment) => (
                      <ListItem
                        key={subDepartment.id}
                        disableGutters
                        sx={{ paddingLeft: getSubDepartmentIndent(1) }} // Indent sub-departments
                      >
                        <Checkbox
                          checked={isSubDepartmentSelected(subDepartment.id)}
                          onChange={() =>
                            handleSubDepartmentSelect(subDepartment.id)
                          }
                        />
                        <ListItemText primary={subDepartment.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default DepartmentListComponent;
