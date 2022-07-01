# get-picture-theme-color

获取照片主题颜色

//安装
yarn add get-picture-theme-color

//引入项目
import {GetPictureThemeColor} from 'get-picture-theme-color'

//使用，传入照片src
GetPictureThemeColor(src).then((rgba)=>{
      console.log(rgba)
})
