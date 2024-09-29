import axios from "axios";

export async function fetchCompetencesGroup() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/all-grup-kompetensi/`
    );

    return {
      statusCode: response.status,
      data: response.data.list_grup_kompetensi.map((item) => {
        return {
          value: item[1],
          label: item[1],
        };
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function fetchCompetenceNameByGroup(group) {
  try {
    const formData = new FormData();
    formData.append("nama_grup_kompetensi", group);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/get-list-kompetensi-by-grup-kompetensi/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("==========Group");
    console.log(group);
    return {
      statusCode: response.status,
      data: response.data.list_kompetensi.map((item) => {
        return {
          value: item[1],
          label: item[1],
        };
      }),
    };
  } catch (error) {
    console.log("error:");
    console.log(error);
    return {
      statusCode: error.response.status,
      message: error.response.data.message,
    };
  }
}
