import puppeteer from "puppeteer";
// import { completion } from "@client/openai";

export const fetchPageData = async (url) => {
  // Launch the browser
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"], // this made it work for now
    headless: false,
  });

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(url);

  // Query for an element handle.
  const titleElement = await page.waitForSelector(".event-title");
  const descElement = await page.waitForSelector(".event-description p");
  const imageElement = await page.waitForSelector(".event-imgs img");
  const timeElement = await page.waitForSelector(".event-time-details");
  const dateElement = await page.waitForSelector(".event-date");
  const locationElement = await page.waitForSelector(".event-loc");
  // const regBtnElement = await page.waitForSelector(".event-reg-btn");

  //   // Do something with element...
  //   await element.click(); // Just an example.
  const title = await titleElement?.evaluate((el) => el.textContent.trim());
  const desc = await descElement?.evaluate((el) => el.innerHTML.trim());
  const image = await imageElement?.evaluate((el) => el.src);
  const time = await timeElement?.evaluate((el) => el.textContent.trim());
  const date = await dateElement?.evaluate((el) => el.textContent.trim());
  const location = await locationElement?.evaluate((el) =>
    el.textContent.trim()
  );
  // const regLink = await regBtnElement?.evaluate((el) =>
  //   el.getAttribute("href")?.trim()
  // );

  // Dispose of handle
  await titleElement.dispose();
  await descElement.dispose();
  await imageElement.dispose();
  await timeElement.dispose();
  await dateElement.dispose();
  await locationElement.dispose();
  // await regBtnElement.dispose();

  // Close browser.
  await browser.close();

  const { startDate, endDate, isMultiple } = parseCustomDateString(
    `${time}, ${date}`
  );

//   let events = [];
//   if (isMultiple) {
//     const c = `extract multiple event details including title, open hours, start and end in datetime format from the following into json format: ${desc}, ${date}`;
//     console.log(c);
//     const multiple = await completion(c);
//     console.log(multiple.choices[0].message.content);
//     const result = JSON.parse(multiple.choices[0].message.content);
//     if (result?.events) {
//       events = result.events;
//     } else if (Array.isArray(result)) {
//       events = result;
//     } else {
//       events = [result];
//     }
//   }

  return {
    // events,
    // regLink,
    date,
    desc,
    endDate,
    image,
    isMultiple,
    location,
    startDate,
    time,
    title,
    url,
  };
};

const matchCustomDateString = (customDateString) => {
  if (customDateString.match("Multiple Times")) {
    const [, dayStr, dateStr] = customDateString.match(
      /(\w+), (\d{2}\/\d{2}\/\d{4})/
    );
    return {
      startTimeStr: null,
      endTimeStr: null,
      dayStr,
      dateStr,
      isMultiple: true,
    };
  } else {
    const [, startTimeStr, endTimeStr, dayStr, dateStr] =
      customDateString.match(
        /(\d{1,2}:\d{2} [ap]m) to (\d{1,2}:\d{2} [ap]m), (\w+), (\d{2}\/\d{2}\/\d{4})/
      );
    return {
      startTimeStr,
      endTimeStr,
      dayStr,
      dateStr,
      isMultiple: false,
    };
  }
};

const splitTime = (timeStr) => {
  if (!timeStr) {
    return {
      hour: null,
      minute: null,
      AMPM: null,
    };
  }
  const [hour, minute, AMPM] = timeStr?.split(/:| /);
  return {
    hour,
    minute,
    AMPM,
  };
};

const parseCustomDateString = (customDateString) => {
  console.log(customDateString);
  const data = matchCustomDateString(customDateString);
  console.log(data);

  //   const [startHour, startMinute, startAMPM] = data.startTimeStr?.split(/:| /);
  //   const [endHour, endMinute, endAMPM] = data.endTimeStr?.split(/:| /);

  const startTime = splitTime(data.startTimeStr);
  const endTime = splitTime(data.endTimeStr);

  const dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].indexOf(data.dayStr);

  const [month, day, year] = data.dateStr.split("/").map(Number);

  let startHour24 = parseInt(startTime.hour, 10);
  let endHour24 = parseInt(endTime.hour, 10);

  if (startTime.AMPM?.toLowerCase() === "pm" && startHour24 !== 12) {
    startHour24 += 12;
  }
  if (endTime.AMPM?.toLowerCase() === "pm" && endHour24 !== 12) {
    endHour24 += 12;
  }

  const startDate = new Date(
    year,
    month - 1,
    day,
    startHour24,
    parseInt(startTime.minute, 10)
  );
  const endDate = new Date(
    year,
    month - 1,
    day,
    endHour24,
    parseInt(endTime.minute, 10)
  );

  return { startDate, endDate, isMultiple: data.isMultiple };
};
