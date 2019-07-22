<template>
	<div class="wrapper">
		<div class="top">
			<span class="top-log">
				<img id="img-log" class="img-log"
				     src="../assets/images/profile/icon_default_head_portrait.png" alt="">
				<label for="img-log" class="user-name" @click="pLogin" v-text="uName !== null ? uName : '请登录' "></label>
				<img class="right" src="../assets/images/profile/device_shop_right_arrow.png" alt="">
			</span>
			<span class="top-m" @click="order">
				<p>我的订单</p>
				<img src="../assets/images/profile/device_shop_right_arrow.png" alt="">
			</span>
			<ul class="order-details" @click="order">
				<li>
					<img src="../assets/images/profile/personal_icon_paid.png" alt="">
					<p>待付款</p>
				</li>
				<li>
					<img src="../assets/images/profile/personal_icon_receipt.png" alt="">
					<p>待收货</p>
				</li>
				<li>
					<img src="../assets/images/profile/personal_icon_received_goods.png" alt="">
					<p>待评价</p>
				</li>
				<li>
					<img src="../assets/images/profile/personal_icon_return_goods.png" alt="">
					<p>退款订单</p>
				</li>
			</ul>
			<img src="../assets/images/profile/personal_ad.png" alt="">
			<div class="details">
				<ul class="details-content">
					<li>
				<span>
					<img src="../assets/images/profile/personal_icon_assets.png" alt="" class="m">
					<p>我的资产</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
					<li>
				<span>
					<img src="../assets/images/profile/pin_logo.jpg" alt="" class="m">
					<p class="d">拼团</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
					<li>
				<span>
					<img src="../assets/images/profile/personal_icon_collection.png" alt=""
					     class="m">
					<p>我的收藏</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
				</ul>
				<ul class="details-item">
					<li>
				<span class="address" @click="address">
					<img src="../assets/images/profile/personal_icon_address.png" alt="" class="m">
					<p>地址管理</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
					<li>
				<span>
					<img src="../assets/images/profile/mijiashop_icon_more_qualifi.png" alt=""
					     class="m">
					<p>资质证照</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
					<li>
				<span>
					<img src="../assets/images/profile/mijiashop_icon_more_protocol.png" alt=""
					     class="m">
					<p>协议规则</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
					<li>
				<span>
					<img src="../assets/images/profile/personal_icon_feedback.png" alt="" class="m">
					<p>帮助反馈</p>
					<img src="../assets/images/profile/device_shop_right_arrow.png" alt=""
					     class="n">
				</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<YpNav></YpNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import YpNav from "../components/YpNav.vue";

        export default {
                components: {YpNav},
                data: function() {
                        return {
                                uName: '',
                        };
                },
                methods: {
                        pLogin(){
                                if(this.uName === null) this.$router.push({path: "login"})

                        },
                        order(){
                                this.$router.push({path: "order"})
                        },
                        address(){
                                this.$router.push({path: "address"})
                        }
                },
	        created() {
                        this.$http({
                                method: "post",
                                url: "/login/uName",
                        })
                                .then(data => {
					this.uName = data;
                                });
	        }
        };
</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		flex-grow: 1;
		overflow: auto;
	}

	.top-log {
		width: 100%;
		height: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-image: url(../assets/images/profile/personal_bg_top.png);;
		background-size: 100% 2rem;
	}

	.top-log > label {
		color: #fff;
		font-size: 0.28rem;
		margin-right: 4rem;
	}

	.top-log > img.img-log {
		width: 1.2rem;
		height: 1.2rem;
		padding-left: 0.5rem;
	}

	.top-log > img.right {
		width: 0.36rem;
		height: 0.36rem;
		padding-right: 0.4rem;
	}

	.top-m {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e9e9e9;
		height: 0.8rem;
	}

	.top-m > p {
		padding-left: 0.4rem;
		font-size: 0.28rem;
	}

	.top-m > img {
		width: 0.3rem;
		height: 0.3rem;
		padding-right: 0.2rem;
	}

	.order-details {
		display: flex;
		justify-content: space-around;
		/*align-content: center;*/
		border-bottom: 1px solid #e9e9e9;
	}

	.order-details > li {
		/*padding-left:20px;*/
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.order-details > li > img {
		width: 0.46rem;
		height: 0.46rem;
		margin-top: 0.16rem;
	}

	.order-details > li > p {
		font-size: 0.24rem;
		/*padding-right:8px;*/
		padding: 0.1rem 0;
	}

	.top > img {
		width: 100%;
	}

	.details-content {
	}

	.details-content > li {
		height: 1rem;
		border-bottom: 1px solid #e9e9e9;
	}

	.details-content > li > span {
		display: flex;
		padding-top: 0.1rem;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.details-content > li > span > img.m {
		width: 0.72rem;
		height: 0.72rem;
		padding-left: 0.3rem;
	}

	.details-content > li > span > img.n {
		width: 0.3rem;
		height: 0.3rem;
		padding-right: 0.2rem;
	}

	.details-content > li > span > p {
		font-size: 0.28rem;
		margin-right: 4.5rem;
	}

	.details-content > li > span > p.d {
		padding-right: 0.6rem;
	}

	.details-item {
	}

	.details-item > li {
		height: 1rem;
		border-bottom: 1px solid #e9e9e9;
	}

	.details-item > li > span {
		display: flex;
		padding-top: 0.1rem;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.details-item > li > span > img.m {
		width: 0.76rem;
		height: 0.76rem;
		padding-left: 0.3rem;
	}

	.details-item > li > span > img.n {
		width: 0.3rem;
		height: 0.3rem;
		padding-right: 0.2rem;
	}

	.details-item > li > span > p {
		font-size: 0.28rem;
		margin-right: 4.5rem;
	}

	.details-item > li > span > p.d {
		padding-right: 0.6rem;
	}

</style>