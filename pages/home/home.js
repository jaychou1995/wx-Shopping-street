// pages/home/home.js
import requests from '../../service/network.js'

import {
  getMultiData,getGoodsData
} from '../../service/home.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommend:[],
	titles:['流行','新款','精选'],
	goods: {
	  "pop": { page: 1, list: [] },
	  "new": { page: 1, list: [] },
	  "sell": { page: 1, list: [] },
	},
	currentType: 'pop',
	showBackTop:false,
	isFixed:false,
	tabScrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.请求首页数据
	this._getMultiData()
	//请求good数据
	this._getGoodsData('pop')
	this._getGoodsData('new')
	this._getGoodsData('sell')
	
	
  },
	
	
	_getMultiData(){
		getMultiData().then((res)=>{
		  const banners = res.data.data.banner.list
		  const recommend = res.data.data.recommend.list
		  this.setData({
		    banners: banners,
		    recommend: recommend
		  })
		}).catch((err)=>{
		  console.log(err)
		})
	},
	
	_getGoodsData(type){
		const page = this.data.goods[type].page
		getGoodsData(type,page).then((res)=>{
		  let list = res.data.data.list
		  // console.log(list);
		  // 将数据设置到对应的数组
		  // this.data.goods[type].list.push(...list) //数据改变时不会刷新 setData会刷新
		  let oldList = this.data.goods[type].list
		  oldList.push(...list)
		  this.data.goods[type].page += 1;
		  
		  const typeKey = `goods.${type}.list`
		  const pageKey = `goods.${type}.page`
		  this.setData({
			  [typeKey]:oldList,
			  [pageKey]:page
		  })
		  
		}).catch((err)=>{
		  console.log(err)
		})
	},
	
	tabClick(e){
		//取出index
		let index = e.detail.index
		console.log(index);
		let currentType = ''
		switch(index){
			case 0:
				currentType = 'pop'
				break
			case 1:
				currentType = 'new'
				break
			case 2:
				currentType = 'sell'
				break
		}
		this.setData({
			currentType:currentType
		})
	},
	
	
	onReachBottom(){
		this._getGoodsData(this.data.currentType)
	},
	
	onPageScroll(option){
		const scrollTop = option.scrollTop
		
		const flag1 = scrollTop >= 1000
		if(flag1 != this.data.showBackTop){
			this.setData({
				showBackTop: flag1
			})
		}
		
		const flag2 = scrollTop >= this.data.tabScrollTop
		if(flag2 != this.data.isFixed){
			this.setData({
				isFixed: flag2
			})
		}
		
	},
	
	handleImageLoad(){
		wx.createSelectorQuery().select('#control').boundingClientRect((ract)=>{
			this.data.tabScrollTop = ract.top
		}).exec()
	}
	
	
})