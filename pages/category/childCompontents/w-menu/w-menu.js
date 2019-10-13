// pages/category/childCompontents/w-menu/w-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		categories:{
			type: Array,
			default:[]
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
	currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
	onItemClick(e) {
		//1.点击后改变currentIndex的值
		const currentIndex = e.currentTarget.dataset.index
		this.setData({
			currentIndex
		})
		
		//2.将currentIndex传到分类页面
		this.triggerEvent('menuclick',{currentIndex}, {})
		  
	}
  }
})
