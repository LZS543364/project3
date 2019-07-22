<template>
	<div class="root">
		<div class="top">
			<img class="left" src="../assets/images/order/std_tittlebar_main_device_back_normal.png" alt="" @click="goBack">
			<div>我的订单</div>
			<img class="right" src="../assets/images/order/search_icon.png" alt="">
		</div>
		<div class="hd-menu">
			<ul>
				<li v-for="item in navList" :key="item.id" :class="curCid === item.id ? 'active':''"  @click="getItem(item.id)"><span v-text="item.name"></span></li>
			</ul>
		</div>
		<div class='content'>
			<div class="image">
				<img src="../assets/images/order/group_title.png" alt="">
				<span>
				<p>查看订单</p>
				<img src="../assets/images/order/device_shop_right_arrow.png" alt="">
			</span>
			</div>
			<ul v-if="list.length > 0">
				<li v-for="item in list" >
					<!--<router-link :to="`detail/${ item.pid }`">-->
						<!--<div class="order-id-wrapper">-->
							<!--<span v-text="`订单编号：${ item.id }`"></span>-->
							<!--&lt;!&ndash;<span class="remove"></span>&ndash;&gt;-->
						<!--</div>-->
						<!--<div class="order-content">-->
							<!--<div class='avatar-wrapper'>-->
								<!--<img :src='item.avatar' alt=''>-->
							<!--</div>-->
							<!--<h3 class='ellipsis' v-text="item.name"></h3>-->
							<!--<div class="order-info">-->
								<!--<span>包裹1</span>-->
								<!--<span class="order-pay" v-text="item.pay.data[0] === 1 ? '已付款' : '未付款' "></span>-->
							<!--</div>-->
						<!--</div>-->
					<!--</router-link>-->
					<div class="tim">
						<div>
							<p v-text="item.shoppingTime"></p>
							<h4 v-text="item.sta = 1 ? '待付款' :  '已付款' "></h4>
						</div>
					</div>
					<div class="order-wrapper">
						<img :src="item.avatar" alt="">
						<div class="order-content">
	                                                <span class="order-top">
	                                                        <p v-text="item.name" class="ellipsis"></p>
	                                                        <h5 v-text='`￥ ${ item.price}`'></h5>
	                                                </span>
							<p align="right" v-text="`X ${ item.count }`"></p>
							<span class="order-bottom">
                                                        <p align="right" > 共计{{item.count}}件商品，总金额<a href="" v-text="`￥${ item.account }`"></a> </p>
                                                </span>
						</div>
					</div>
					<div class="btn">
						<input type="button" value="删除订单" class="del"/>
						<input type="button" value="评价晒单" class="evaluate">
					</div>
				</li>
			</ul>
			<p v-else>订单列表中暂无商品..</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return {
                                curCid: 0,	// 0为默认选择第一个，-1为不选择
				list: [],
	                        navList: [
		                        { id: 0, name: '全部'},
		                        { id: 1, name: '待付款'},
		                        { id: 2, name: '待发货'},
		                        { id: 3, name: '已发货'},
		                        { id: 4, name: '待评价'},
	                        ]
                        }
                },
	        methods: {
                        getItem(payload) {
                                this.curCid = payload;  // 把当前点击元素的index，赋值给activeClass
	                        this._getData()
                        },
                        _getData() {
                                this.$http({
                                        method: 'post',
                                        url: '/order/list',
                                })
	                                .then((data) => {
                                                if(this.curCid === 0) {
                                                        this.list = data;
                                                } else {
                                                        this.list = data.filter( item => {  return parseInt(item.sta) === this.curCid})
                                                }
	                                })
                        },
		        goBack() {
                                this.$router.go(-1);
		        }

	        },
	        created() {
                        this._getData()
	        }

        };
</script>

<style scoped>
	body {
		background-color: #f3f3f3;
	}
	.root {
		width:100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.24rem;
		background-color: #f3f3f3;
	}
	.top {
		background-color: white;
		display: flex;
		justify-content:space-between;
		align-items: center;
		border-bottom: 1px solid #e9e9e9;
	}
	.top>img.left {
		width:0.8rem;
	}
	.top>div {
		font-size:0.32rem;
		color: #333333;
	}
	.top>img.right {
		width:0.32rem;
		padding-right: 0.32rem;
	}
	.hd-menu {
		flex-shrink: 0;
		box-sizing: border-box;
		padding: 0 0.30016rem;
		border-bottom: 0.01rem solid #d9d9d9;
		background-color: white;
	}
	.hd-menu>ul {
		display: flex;
		justify-content: space-around;
	}
	.hd-menu>ul>li {
		box-sizing: border-box;
		height: 0.8004rem;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 0.2rem;
	}
	.hd-menu>ul>li>span {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		line-height: 0.8004rem;
		text-align: center;
		border-bottom: 0.04rem solid transparent;
	}
	.hd-menu>ul>li.active>span {
		color: #b4282d;
		border-color: #b4282d;;
	}
	.content {
		overflow: auto;
	}
	.content>ul {}
	.content>ul>li {
		margin: 0.1rem 0;
		background-color: white;
	}
	.tim {
		height: 0.8rem;
		line-height: 0.8rem;
	}
	.tim>div {
		display: flex;
		justify-content:space-between;
		margin: 0 0.26rem;
		border-bottom: 1px solid #e9e9e9;
	}
	.tim>div>p {
		color: #999999;
		font-size: 0.24rem;
	}
	.tim>div>h4 {
		color: #9f8052;
		font-size: 0.24rem;
		font-weight: normal;
	}
	.order-wrapper {
		margin: 0.3rem 0.26rem;
		display: flex;
		padding-bottom: 0.6rem;
		align-items: center;
		border-bottom: 1px solid #e9e9e9;
		/*justify-content:s*/
	}
	.order-wrapper>img {
		width: 1.6rem;
		background-color: #e9e9e9;
		padding: 0.1rem;

	}
	.order-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-left: 0.2rem;
		/*justify-content: flex-end;*/
	}
	.order-content>.order-top {
		display: flex;
		justify-content: space-between;
	}
	.order-top>p {
		color: #333333;
		font-size: 0.26rem;
		width: 80%;
	}
	.order-top>h5 {
		color: #999999;
		font-size: 0.24rem;
		font-weight:normal;
	}
	.order-content>p {
		margin: 0.2rem;
		color: #999999;
		font-size: 0.22rem;
		/*align: right;*/
	}
	.order-bottom {  }
	.order-bottom>p {
		color: #333333;
		font-size: 0.24rem;
	}
	.order-bottom>p>a {
		color: #b60909;
		font-size: 0.32rem;
	}
	.btn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 0 0.26rem;
		padding-bottom: 0.3rem;
	}
	.btn>input {
		color: #666666;
		font-size: 0.26rem;
		margin-left: 0.2rem;
		width: 1.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background-color: white;
		outline: none;
		border:1px solid gray;
		border-radius: 0.06rem;
	}
	.image {
		background-color: white;
		display: flex;
		justify-content:space-between;
		align-items: center;
		height: 0.9rem;
		margin: 0.2rem 0;
		/*padding 0 0.26rem;*/
	}
	.image>img {
		width: 1.2rem;
		/*height: 0.6rem;*/
		padding-left: 0.26rem;
	}
	.image>span {
		display: flex;
		align-items: center;
		padding-right: 0.26rem;
	}
	.image>span>p {}
	.image>span>img {
		width: 0.24rem;
	}
	.btn>input.del {}
	.btn>input.evaluate {}
</style>