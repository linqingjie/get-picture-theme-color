export function GetPictureThemeColor(src, w = 200, h = 200) {
  return new Promise((resolve) => {
    const imgDom = document.createElement("img");
    imgDom.src = src;
    imgDom.crossOrigin = "";
    imgDom.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const context = canvas.getContext("2d");
      context.drawImage(imgDom, 0, 0);
      let pxArr = context.getImageData(0, 0, w, h).data;
      pxArr = Array.from(pxArr);
      const colorList = {};
      let i = 0;
      while (i < pxArr.length) {
        const r = pxArr[i];
        const g = pxArr[i + 1];
        const b = pxArr[i + 2];
        const a = pxArr[i + 3];
        i = i + 4; // 最后 +4 比每次 i++ 快 10ms 左右性能
        const key = [r, g, b, a].join(",");
        key in colorList ? ++colorList[key] : (colorList[key] = 1);
      }
      let arr = [];
      for (let key in colorList) {
        arr.push({
          rgba: `rgba(${key})`,
          num: colorList[key],
        });
      }
      arr = arr.sort((a, b) => b.num - a.num);
      resolve(arr[0].rgba);
    };
  });
}
