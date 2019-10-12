// pages/profile/childCompontents/user-info-top/user-info-top.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
		userInfo:{
			type:Object,
			default:{}
		}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
	getUserInfo(e){
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
		  userInfo: e.detail.userInfo,
		  hasUserInfo: true
		})
	}
  }
})
