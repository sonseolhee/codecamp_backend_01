// 1. 가장 기본 방법
// new Promise((resolve, reject) => {
//   // 뭔가 특정 작업

//   if (성공!!) {
//     resolve();
//   }

//   if (실패!!) {
//     reject();
//   }
// });

// 2.

async function fetchData() {
  console.time("===개별 Promise 각각===");
  const result1 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 2000);
  });

  const result2 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 3000);
  });

  const result3 = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공시 받는 데이터");
    }, 1000);
  });
  console.timeEnd("===개별 Promise 각각===");
}

async function fetchData2() {
  console.time("===한방에 Promise.all ===");

  const results = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공시 받는 데이터");
      }, 1000);
    }),
  ]);

  console.timeEnd("===한방에 Promise.all ===");
}

fetchData();
fetchData2();
