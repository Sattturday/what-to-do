import fetch from "node-fetch";

let globalData: {
  activity: string;
  type: string;
  participants: number;
  time: string;
} | null = null;

function hasOwnPropertyFromUnknown<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

function f(v: number): boolean | null {
  if (v === 42) {
    return true;
  } else if (v === 43) {
    return false;
  } else return null;
}

type G = number | null;

function gChecker(v: number): {
  value: G;
} | null {
  if (v === 42) {
    return {
      value: 42,
    };
  } else if (v === 43) {
    return {
      value: 43,
    };
  } else return null;
}

function gCheckerIncorrect(v: number): G | null {
  if (v === 42) {
    return 42;
  } else if (v === 43) {
    return 43;
  } else return null;
}

async function fetchData(): Promise<boolean> {
  let response: fetch.Response;

  try {
    response = await fetch("https://www.boredapi.com/api/activity");
  } catch (e) {
    console.error(
      "7e804a3c-bd6c-433e-b478-32f02832e249 Error fetching data:",
      e
    );
    return false;
  }

  try {
    const jsonData: unknown = await response.json();

    if (
      typeof jsonData === "object" &&
      jsonData !== null &&
      hasOwnPropertyFromUnknown(jsonData, "activity") &&
      typeof jsonData.activity === "string" &&
      hasOwnPropertyFromUnknown(jsonData, "type") &&
      typeof jsonData.type === "string" &&
      hasOwnPropertyFromUnknown(jsonData, "participants") &&
      typeof jsonData.participants === "number"
    ) {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const formattedTime = `${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;

      globalData = {
        activity: jsonData.activity,
        type: jsonData.type,
        participants: jsonData.participants,
        time: formattedTime,
      };
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "284a654e-2b36-4265-b047-5f7c76b1964c Error fetching data:",
      error
    );
    return false;
  }
}

function getGlobalData(): typeof globalData {
  return globalData;
}

// Вызов функции fetchData 2 раза в минуту
setInterval(fetchData, 30000);

export { fetchData, getGlobalData };
