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
  const result = await new Promise((resolve, reject) => {
    // 뭔가 특정 작업
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸림을 가정
      try {
        resolve("성공시 받는 데이터");
      } catch (error) {
        reject("실패했습니다!!!");
      }
    }, 2000);
  });
  console.log(result);
  console.log("끝!!!");
}

fetchData();
