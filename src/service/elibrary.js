import { faker } from "@faker-js/faker";

const createDummyData = () => {
  return {
    title: faker.lorem.sentence({ min: 5, max: 12 }),
    type: faker.helpers.arrayElement(["book", "Journal", "paper"]),
    competence: {
      group: faker.lorem.sentence({ min: 2, max: 3 }),
      name: faker.lorem.sentence({ min: 2, max: 5 }),
    },
  };
};

export const fetchElibrary = async (page = 1, row = 10) => {
  const totalData = 2485;
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
};
