// pages/category/category.js

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
		categories: [],
		categoryData: {
		},
		currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getData()
  },


	getData(){
		this._getCategory()
		// this._getSubcategory()
		// this._getCategoryDetail()
	},
	
	
	_getCategory(){
		getCategory().then((res)=>{
			// 获取categories
			const categories = res.data.data.category.list;
			// console.log(categories);
			
			//初始化每个类别的子数据
			const categoryData = {}
			for(let i = 0;i<categories.length;i++){
				categoryData[i] = {
				  subcategories: [],
				  categoryDetail: []
				  // categoryDetail: {
				  //   'pop': [],
				  //   'new': [],
				  //   'sell': []
				  // }
				}
			}
			
			//设置
			this.setData({
				categories: categories,
				categoryData: categoryData
			})
			
			 // 4.请求第一个类别的数据
			this._getSubcategory(0)
	
			// 5.请求第一个类别的详情数据
			this._getCategoryDetail(0)
		})
	},
	
	_getSubcategory(currentIndex){
		//获取对应的key
		const maitkey = this.data.categories[currentIndex].maitKey
		getSubcategory(maitkey).then((res)=>{
			// 获取Subcategory
			const tempCategoryData = this.data.categoryData;
			tempCategoryData[currentIndex].subcategories = res.data.data.list;
			this.setData({
				categoryData:tempCategoryData
			})
		})
	},
	
	_getCategoryDetail(currentIndex){
		// 1.获取对应的miniWallKey
		const miniWallKey = this.data.categories[currentIndex].miniWallkey;
		
		getCategoryDetail(miniWallKey, 'pop').then((res)=>{
			
			// 1.获取categoryData
		    const categoryData = this.data.categoryData;
	
			// 2.修改数据
			categoryData[currentIndex].categoryDetail = res;
	
			// 3.修改data中的数据
			this.setData({
				categoryData: categoryData
			})
			console.log(this.data);
		})
	},
	menuClick(e) {
	    // 1.改变当前的currentIndex
	    const currentIndex = e.detail.currentIndex;
	    this.setData({
	      currentIndex
	    })
	
	    // 2.请求对应currentIndex的数据
	    this._getSubcategory(currentIndex);
	
	    // 3.请求对应的currentIndex的详情数据
	    this._getCategoryDetail(currentIndex)
	},
	
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})