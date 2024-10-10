import { faker } from "@faker-js/faker";

const createDummyData = () => {
  const type = [
    "review module",
    "generate module",
    "extract e-book",
    "Generate CoQa",
    "Mapping Module",
  ];
  const statusRequest = ["done", "processing", "cancelled"];
  return {
    date: faker.date.past().toISOString(),
    type: faker.helpers.arrayElement(type),
    details: faker.lorem.sentences({ min: 5, max: 12 }),
    status: faker.helpers.arrayElement(statusRequest),
    user: faker.person.fullName(),
  };
};

export const fetchRequestHistory = async (page = 1, row = 10) => {
  try {
    const totalData = 753;

    const allData = Array.from({ length: totalData }, (_, index) => ({
      no: index + 1,
      ...createDummyData(),
    }));

    const startIndex = (page - 1) * row;
    const endIndex = Math.min(startIndex + row, totalData);

    const paginatedData = allData.slice(startIndex, endIndex);

    return {
      status: "success",
      message: "success",
      result: {
        total: allData.length,
        currentPage: page,
        totalPages: Math.ceil(totalData / row),
        data: paginatedData,
      },
    };
  } catch (e) {
    console.error(e);
  }
};
