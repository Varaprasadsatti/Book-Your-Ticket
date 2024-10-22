export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

  export const addBusFormElements = [
    {
      label: "Bus Type",
      name: "busType",
      componentType: "select", // Dropdown
      options: [
        { id: "palle_velugu", label: "Palle Velugu" },
        { id: "ultra_delux", label: "Ultra Delux" },
      ],
    },
    {
      label: "Capacity",
      name: "capacity",
      componentType: "input", // Input field for capacity
      type: "number", // Number type for bus capacity
      placeholder: "Enter bus capacity",
    },
    {
      label: "Start Point",
      name: "startPoint",
      componentType: "select", // Dropdown
      options: [
        { id: "iiit_nuzvid", label: "IIIT NUZVID" },
        { id: "iiit_srikakulam", label: "IIIT SRIKAKULAM" },
      ],
    },
    {
      label: "End Point",
      name: "endPoint",
      componentType: "select", // Dropdown
      options: [
        { id: "srikakulam", label: "Srikakulam" },
        { id: "kakinada", label: "Kakinada" },
        { id: "vizag", label: "Vizag" },
        { id: "chittoor", label: "Chittoor" },
        { id: "guntur", label: "Guntur" },
        { id: "ongole", label: "Ongole" },
        { id: "kadapa", label: "Kadapa" },
        { id: "anantapur", label: "Anantapur" },
        { id: "rajamahendravaram", label: "Rajamahendravaram" },
        { id: "nellore", label: "Nellore" },
        { id: "kurnool", label: "Kurnool" },
        { id: "tirupati", label: "Tirupati" },
        { id: "annavaram", label: "Annavaram" },
        { id: "amalapuram", label: "Amalapuram" },
        { id: "vizianagaram", label: "Vizianagaram" },
        { id: "bhimavaram", label: "Bhimavaram" },
      ],
    },
    {
      label: "Bus Fare",
      name: "busFare",
      componentType: "input", // Input field for bus fare
      type: "number", // Text type for bus fare
      placeholder: "Enter bus fare",
    },
  ];

  export const OriginMap =
    {
      iiit_nuzvid : "IIIT NUZVID",
      iiit_srikakulam : "IIIT SRIKAKULAM",
    }
  

  export const destinationMap = 
    {
      "srikakulam": "Srikakulam",
      "kakinada": "Kakinada",
      "vizag": "Vizag",
      "chittoor": "Chittoor",
      "guntur": "Guntur",
      "ongole": "Ongole",
      "kadapa": "Kadapa",
      "anantapur": "Anantapur",
      "rajamahendravaram": "Rajamahendravaram",
      "nellore": "Nellore",
      "kurnool": "Kurnool",
      "tirupati": "Tirupati",
      "annavaram": "Annavaram",
      "amalapuram": "Amalapuram",
      "vizianagaram": "Vizianagaram",
      "bhimavaram": "Bhimavaram"
    }
  
  export const busTypeMap = {
    "palle_velugu" : "Palle Velugu",
    "ultra_delux" : "Ultra Delux" ,
  }

  export const bookTicketFormElements = [
    {
      name: "studentId",
      label: "Student Id",
      placeholder: "Enter your Id Number",
      componentType: "input",
      type: "text",
    },
    {
      name: "name",
      label: "Full Name",
      placeholder: "Enter your Name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your Personal email",
      componentType: "input",
      type: "email",
    },
    {
      name: "branch",
      label: "Branch",
      componentType : "select",
      options: [
        { id: "puc", label: "PUC" },
        { id: "ece", label: "ECE" },
        { id: "cse", label: "CSE" },
        { id: "mech", label: "ME" },
        { id: "civil", label: "CE" },
        { id: "eee", label: "EEE" },
      ],
    },
    {
      name: "academicYear",
      label: "Academic Year",
      componentType : "select",
      options: [
        { id: "puc1", label: "PUC1" },
        { id: "puc2", label: "PUC2" },
        { id: "e1", label: "E1" },
        { id: "e2", label: "E2" },
        { id: "e3", label: "E3" },
        { id: "e4", label: "E4" },
      ],
    },
    {
      name: "studentMobile",
      label: "Student Mobile",
      placeholder: "Enter your Mobile Number",
      componentType: "input",
      type: "text", 
    },
    {
      name: "parentMobile",
      label: "Parent Mobile",
      placeholder: "Enter your Parent Mobile Number",
      componentType: "input",
      type: "text", 
    },
  ]
