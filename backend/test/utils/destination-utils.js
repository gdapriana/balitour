import db from "../../src/application/database.js";
import slugify from "slugify";

export const destinationTestProperties = {
  DESTINATION_1_NAME: 'DESTINATION_TEST_1_NAME',
  DESTINATION_1_DESC: 'DESTINATION_TEST_1_DESC',
  DESTINATION_1_COVER: 'https://google.com/DESTINATION_TEST_1_COVER',
  DESTINATION_1_MAP: 'https://google.com/DESTINATION_TEST_1_MAP',
  DESTINATION_1_ADDRESS: 'DESTINATION_TEST_1_ADDRESS',
  DESTINATION_2_NAME: 'DESTINATION_TEST_2_NAME',
  DESTINATION_2_DESC: 'DESTINATION_TEST_2_DESC',
  DESTINATION_2_COVER: 'https://google.com/DESTINATION_TEST_2_COVER',
  DESTINATION_2_MAP: 'https://google.com/DESTINATION_TEST_2_MAP',
  DESTINATION_2_ADDRESS: 'DESTINATION_TEST_2_ADDRESS',
}

export const dataDestination1 = {
  slug: slugify(destinationTestProperties.DESTINATION_1_NAME, {lower: true}),
  name: destinationTestProperties.DESTINATION_1_NAME,
  description: destinationTestProperties.DESTINATION_1_DESC,
  address: destinationTestProperties.DESTINATION_1_ADDRESS,
  cover: destinationTestProperties.DESTINATION_1_COVER,
  map: destinationTestProperties.DESTINATION_1_MAP,
}

export const dataDestination2 = {
  slug: slugify(destinationTestProperties.DESTINATION_2_NAME, {lower: true}),
  name: destinationTestProperties.DESTINATION_2_NAME,
  description: destinationTestProperties.DESTINATION_2_DESC,
  address: destinationTestProperties.DESTINATION_2_ADDRESS,
  cover: destinationTestProperties.DESTINATION_2_COVER,
  map: destinationTestProperties.DESTINATION_2_MAP,
}

export const createDestination1 = async () => {
  await db.destination.create({
    data: dataDestination1
  })
}

export const createDestination2 = async () => {
  await db.destination.create({
    data: dataDestination2
  })
}

export const deleteAllDestinations = async () => {
  await db.destination.deleteMany({
    where: {
      slug: { contains: 'test', mode: 'insensitive' }
    }
  })
}
