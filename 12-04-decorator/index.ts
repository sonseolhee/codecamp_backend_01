// function zzz(aaaaaaa) {
//   console.log("==============");
//   console.log(aaaaaaa);
//   console.log("==============");
// }

// @zzz
// class AppController {}

function zzz() {
  return (aaaaaaa) => {
    console.log("==============");
    console.log(aaaaaaa);
    console.log("==============");
  };
}

@zzz()
class AppController {}
