<template>
	<div class="wrapper">
		<div class="top">
			<span class="top-left" @click="goBack">
				<!--<img src="images/details/std_titlebar_detailBackNormal.png" alt="">-->
			</span>
				<span class="top-content">
				<ul>
					<li>商品</li>
					<li>详情</li>
					<li>推荐</li>
				</ul>
			</span>
			<span class="top-right">
				<!--<img src="images/details/detail_nav_icon_more_transparent.png" alt="">-->
			</span>
		</div>
		<div class="content-items">
			<div class="detail-top">
				<div class="banner" ref="banner">
					<ul class="clearfix">
						<li v-for="item in banners"><img :src="item" alt=""></li>
					</ul>
				</div>
				<div class="intro">
					<h3 v-text="`￥${ product.price }`"></h3>
					<div class="remark">
						<div>
							<img src="../assets/images/details/detail_icon_crowd.png" alt="">
							<h4 v-text="product.name"></h4>
						</div>
					</div>
					<p v-text="product.remark"></p>
				</div>
			</div>
			<div class="zhongchou">
				<div class="tiao">
					<img src="../assets/images/details/bookingLine.png" alt="" class="long">
					<img src="../assets/images/details/icon_list_hot.png" alt="" class="hot">
					<span id="re">14142%</span>
				</div>
				<div class="process">
					<ul>
						<li>
							<div>
                                                                <span class="num">
	                                                                <h4>35.7</h4>
                                                                        <p>万次</p>
                                                                </span>
								<span class="sm">
									<img id="img1" src="../assets/images/details/detail_icon_support2.png" alt="" />
									<label for="img1">参与人数</label>
								</span>
							</div>
						</li>
						<li>
							<div>
                                                                <span class="num">
			                                                <h4>28.2</h4>
			                                                <p>万人</p>
                                                                </span>
								<span class="sm">
									<img id="img2" src="../assets/images/details/detail_icon_support.png" alt="" />
									<label for="img2">全款支持</label>
								</span>
							</div>
						</li>
						<li>
							<div>
			                                        <span class="num">
			                                                <h4>1125</h4>
			                                                <p>万元</p>
			                                        </span>
								<span class="sm">
									<img id="img3" src="../assets/images/details/detail_icon_price.png" alt="" />
									<label for="img3">已筹金额</label>
								</span>
							</div>
						</li>
						<li>
							<div>
			                                        <span class="alone">
			                                                <h4>已结束</h4>
			                                        </span>
								<span class="sm">
									<img id="img4" src="../assets/images/details/detail_icon_day.png" alt="" />
									<label for="img4">剩余时间</label>
								</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="images-wrapper">
					<img src="../assets/images/details/1.png" alt="">
				</div>
				<div class="new">
					<img src="../assets/images/details/2.png" alt="">
				</div>
				<div class="yi">
					<span>
						<p>已选</p>
						<h4>全款支持x1</h4>
						<img src="../assets/images/details/device_shop_right_arrow.png" alt="">
					</span>
				</div>
				<div class="er">
					<span>
						<p>物流</p>
						<h4>预计2019年07月18号开始发货</h4>
					</span>
				</div>
				<div class="san">
					<span>
						<p>服务</p>
						<ul>
							<li>
								<img src="../assets/images/details/detail_icon_service_v2.png" alt="">
								<h4>包邮</h4>
							</li>
							<li>
								<img src="../assets/images/details/detail_icon_service_v2.png" alt="">
								<h4>有品三方</h4>
							</li>
							<li>
								<img src="../assets/images/details/detail_icon_service_v2.png" alt="">
								<h4>7天无理由</h4>
							</li>
						</ul>
						<img src="../assets/images/details/device_shop_right_arrow.png" alt="">
					</span>
				</div>
			</div>
			<div class="content">
				<ul>
					<li>
						<p>产品详情</p>
					</li>
					<li>
						<p>常见问题</p>
					</li>
					<li>
						<p>团队介绍</p>
					</li>
					<li>
						<p>项目进展</p>
					</li>
				</ul>
			</div>
			<div class="img-content">
				<ul>
					<li><img src="../assets/images/details/6.jpg" alt=""></li>
					<li><img src="../assets/images/details/7.jpg" alt=""></li>
					<li><img src="../assets/images/details/8.jpg" alt=""></li>
					<li><img src="../assets/images/details/9.jpg" alt=""></li>
					<li><img src="../assets/images/details/10.jpg" alt=""></li>
					<li><img src="../assets/images/details/1.gif" alt=""></li>
					<li><img src="../assets/images/details/66.jpg" alt=""></li>
					<li><img src="../assets/images/details/67.jpg" alt=""></li>
					<li><img src="../assets/images/details/68.jpg" alt=""></li>
				</ul>
			</div>
			<div class="jian">
				<h4>为您推荐</h4>
			</div>
			<div class="content-wrapper">
				<ul>

				</ul>
			</div>
		</div>
		<div class="meng" v-show="isAccount">
			<div class="meng-item">
                                <span class="meng-item1">
                                        <img :src="product.avatar" alt="" />
                                        <span>
                                                <h3 v-text="`￥${ product.price }`"></h3>
                                                <span>
                                                        <p>已选：</p>
                                                        <h4 class="account" v-text="`${ count }件`"></h4>
                                                </span>
                                        </span>
                                </span>
				<p>数量</p>
				<span class="plus">
                                        <span class="decrease" @click="decrease"><img src="../assets/images/details/sku_icon_minus_no.png" alt=""></span>
                                        <span class="count" v-text="count"></span>
                                        <span class="increase" @click="increase" ><img src="../assets/images/details/sku_icon_plus_no.png" alt=""></span>
                                </span>
				<input type="button" value="确定" class="add-to" @click="addCart">
			</div>
		</div>
		<div class="footer">
			<ul>
				<li class="images-container">
					<img src="../assets/images/details/device_shop_detail_unfavor_v3.png" @click="Checked = !Checked" v-show="Checked" alt="" class="images-item">
					<img src="../assets/images/details/device_shop_detail_favor_v3.png" @click="Checked = !Checked" v-show="!Checked" alt="" class="images-item1">
					<p>收藏</p>
				</li>
				<li class="jump">
					<img src="../assets/images/details/shop_cart_v3.png" alt="" @click="jump">
					<p>购物车</p>
				</li>
				<li>
					<input type="button" value="加入购物车" class="add" @click="isAccount = true">
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import NumCount from '../components/NumCount.vue';
        import { createNamespacedHelpers } from 'vuex';
        let { mapActions, mapState } = createNamespacedHelpers('detail');
        import BScroll from 'better-scroll';
        import imagesLoaded from 'imagesloaded';

        export default {
                components: { NumCount },
                data() {
                        return {
                                isAccount: false,
                                count: 1,
	                        Checked: true
                        }
                },
                computed: {
                        ...mapState(['product', 'banners' ]),
                },
                methods: {
                        ...mapActions(['getData', '_addCart']),
                        getData2() {
                                this.getData(parseInt(this.$route.params.id));
                        },
                        increase() {
                                if( this.count === 5) {
                                        this.$store.commit('alert/open', '商品数量已经达到上限..'); return;
                                }else {
                                        this.count = this.count + 1;
                                }
                        },
                        decrease() {
                                if( this.count === 1) {
                                        this.$store.commit('alert/open', '不要再减啦！！！'); return;
                                }else {
                                        this.count = this.count - 1;
                                }
                        },
                        addCart() {
                                this._addCart({ id: this.product.id, count: this.count})
                                        .then(results => {
                                                if(results === null) this.$store.commit('alert/open', '加入购物车成功');
                                                this.isAccount = false;
                                        })
                        },
                        initOrUpdateBannerScroll() {
                                imagesLoaded(this.$refs.banner, () => {
                                        this.$nextTick(() => {
                                                this.scroll = new BScroll(this.$refs.banner, {
                                                        scrollX: true,
                                                        scrollY: false,
                                                        momentum: false, //关闭惯性滚动
                                                        snap: {
                                                                loop: true,
                                                                threshold: 0.2  //触发滚动的临界距离
                                                        }
                                                });
                                                this.scroll.on('scrollStart', () => clearTimeout(this.timer));
                                                this.scroll.on('scrollEnd', () => this.timer = setTimeout(() => this.scroll.next(), 3000));
                                                this.timer = setTimeout(() => this.scroll.next(), 3000);
                                        });
                                });
                        },
	                goBack() {
                                this.$router.go(-1);
	                },
	                jump() {
                                this.$router.push('/cart');
	                }
                },
                created() {
                        this.getData2();
                        this.isAccount = false;

                },
                updated() {
                        this.initOrUpdateBannerScroll();
                },
                destroyed() {
                        if(this.scroll) this.scroll.destroy();
                },
        };

</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-direction:column;
		position: relative;
		width: 100%;
		height: 100%;
	}
	.top {
		/*display: none;*/
		flex-shrink:0;
		display: flex;
		justify-content: space-between;
		/*align-items: center;*/
		background-color: white;
		height: 1rem;
	}
	.top-left {
		width: 1rem;
		height:1rem;
		background-image: url("../assets/images/details/std_titlebar_detailBackNormal.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		background-color: transparent;
	}
	/*.top-left>img {*/
	/**/
	/*background-color: white;*/
	/*}*/
	.top-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.top-content>ul {
		display: flex;
	}
	.top-content>ul>li {
		font-size: 0.28rem;
		color: #000;
		padding:0.2rem 0.2rem 0.2rem 0 ;
		border-bottom: 1px solid transparent;
	}
	.top-content>ul>li:hover{
		color: #845f3f;
		border-bottom: 1px solid #845f3f;
	}
	.top-right {
		width: 1rem;
		height:1rem;
		background-image: url("../assets/images/details/detail_nav_icon_more_transparent.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 70% 70%;
		background-color: transparent;
	}
	/*.top-right>img {*/
	/*width:0.7rem;*/
	/*height:0.7rem;*/
	/*padding-top:0.159rem;*/
	/*padding-right: 0.2rem;*/
	/*}*/

	.banner {
		width: 100%;
		height: 7.5rem;
		background-color: white;
		overflow: hidden;
	}
	.banner>ul {
		width: 700%;
		height: 100%;
	}
	.banner>ul>li {
		width: 14.28571428571429%;
		height: 100%;
		float: left;
	}
	.banner>ul>li>img {
		width: 100%;
	}
	.content-items {
		flex-grow:1;
		overflow: auto;
	}
	.intro>h3 {
		font-size:0.5rem;
		color: red;
		margin-top:0.24rem;
		padding: 0 0.24rem;
		/*display: inline-block;*/
	}
	.intro>p {
		font-size:0.26rem;
		margin-top: 0.2rem;
		color: #333333;
		padding: 0 0.24rem;
	}
	.remark {
		color: #7F7F7F;
		display: flex;
		justify-content: space-between;
		padding-right: 0.30016rem ;
	}
	.remark>div {
		display: flex;
		align-items: center;
		padding-left: 0.24rem;
		margin-top: 0.2rem;
	}
	.remark>div>img {
		display: block;
		/*font-size: 0.320173rem;*/
		/*color: #333333;*/
		margin-bottom: 0.02rem;
		width:1.24rem;
		height:0.36rem;
		/*text-align: center;*/
	}
	.remark>div>h4 {
		font-size:0.34rem;
		margin-left: 0.2rem;
		color: #333;
	}
	.process {
		/*margin-bottom: 0.25rem;*/
	}
	.process>ul {
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		align-items: center;
	}
	.process>ul>li {
		display: flex;
		flex-direction:column;
		align-items: center;
	}
	.process>ul>li>div {}
	.process>ul>li>div>span.num {
		display: flex;
		align-items: baseline;
	}
	.process>ul>li>div>span.num>h4 {
		font-size:0.36rem;;
	}
	.process>ul>li>div>span.num>p {
		font-size:0.22rem;
		/*padding-left:0.2rem;*/
	}
	.process>ul>li>div>span.sm {
		display: flex;
		align-items: center;
		padding-top: 0.1rem;
	}
	.process>ul>li>div>span.sm>img {
		width:0.2rem;
	}
	.process>ul>li>div>span.sm>label {
		font-size:0.22rem;
		color: #999999;
	}
	.alone {}
	.alone>h4 {
		font-size: 0.36rem;
		color: #666666;
		font-weight: normal;}
	.tiao {
		/*margin-top:0.4rem;*/
		/*display: inline-block;*/
		/*margin-top: 0.8rem;*/
		display: flex;
		height:0.8rem;
		align-items: center;
	}
	.tiao>img.long {
		width: 70%;
		/*background-color: #c04343;*/
		height: 0.12rem;
		padding-left:0.2rem;
	}
	.tiao>img.hot {
		width:0.28rem;
		margin: 0 0 0.02rem 0.2rem;
	}
	.tiao>span {
		font-size:0.28rem;
		padding-left:0.2rem;
		color: #fe6418;
	}
	.images-wrapper {
		margin-top: 0.1rem;
	}
	.images-wrapper>img {
		height: 0.76rem;
		display: block;
	}
	.new {
		background-color: #f8f8f8;
	}
	.new>img {
		height:0.84rem;
		width: 100%;
	}
	.yi {
		margin: 0 0.28rem;
		padding:0.24rem 0;
	}
	.yi>span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.yi>span>h4 {
		font-size:0.26rem;
		padding-right:4.38rem;
	}
	.yi>span>p {
		font-size: 0.24rem;
	}
	.yi>span>img {
		width:0.24rem;
	}
	.er {
		margin: 0 0.28rem;
		padding:0.24rem 0;
	}
	.er>span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.er>span>h4 {
		font-size:0.26rem;
		padding-right:2.67rem;
		font-weight: normal;
	}
	.er>span>p {
		font-size: 0.24rem;
	}
	.san {
		margin: 0 0.28rem;
		padding:0.24rem 0;
	}
	.san>span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.san>span>ul {
		display: flex;
		align-items: center;
		margin-right: 1.8rem;
	}
	.san>span>ul>li {
		display: flex;
		align-items: center;
		margin-left:0.2rem;
	}
	.san>span>ul>li>img {
		width:0.24rem;
		margin-right: 0.1rem;
	}
	.san>span>ul>li>h4 {
		font-size:0.26rem;
		/*padding-right:2.55rem;*/
		font-weight: normal;
	}
	.san>span>p {
		font-size: 0.24rem;
	}
	.san>span>img {
		width:0.24rem;
	}
	.content {}
	.content>ul {
		/*width: 80%;*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0;
	}
	.content>ul>li {
		margin: 0.3rem 0.4rem;
	}
	.content>ul>li>p {
		font-size:0.24rem;
	}
	.img-content {
		font-size: 0;
	}
	.img-content>ul {
		display: flex;
		flex-direction:column;
		justify-content: flex-start;
	}
	.img-content>ul>li {}
	.img-content>ul>li>img {
		width:100%;
	}
	.footer {
		flex-shrink:0;
	}
	.footer >ul {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.06rem;
		/*line-height: 1.06rem;*/
	}
	.footer >ul>li {
		width: 0.84rem;
		height:100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.footer >ul>li:nth-child(1) {
		flex-shrink: 0;
		margin-left: 0.08rem;
	}
	.footer >ul>li:nth-child(2) {
		flex-shrink: 0;
		margin-left: 0.08rem;
	}
	.footer >ul>li:nth-child(3) {
		flex-grow: 1;

	}
	.footer >ul>li>img {
		width:0.6rem;
	}
	.footer >ul>li>img.images-item1 {
		/*display: none;*/
	}
	.footer >ul>li>p {
		font-size: 0.2rem;
	}
	.footer >ul>li>input {
		width: 80%;
		height: 70%;
		font-size: 0.26rem;
		background-color: red;
		/*margin-top: 0.15rem;*/
		color: #ffffff;
		border-style: none;
		border-radius: 0.4rem;
		outline: none;
		margin: 0 0.3rem;
	}
	.meng {
		height: 10rem;
		border-top-right-radius: 0.2rem;
		border-top-left-radius: 0.2rem;
		position: fixed;
		bottom:0;
		background-color: white;
		width: 100%;
		z-index: 10;
		/*display: none;*/
	}
	.meng-item {
		padding: 0.28rem;
		/*position: relative;*/
	}
	.meng-item1 {
		display: flex;
		align-items: center;
	}
	.meng-item1>img {
		width: 1.8rem;
		/*flex-shrink:0;*/
		background-color: #e9e9e9;
		border-radius: 0.1rem;
	}

	.meng-item1>span {
		padding-left:0.2rem;
		display: flex;
		flex-direction: column;
	}
	.meng-item1>span>h3 {
		color: red;
		font-size:0.4rem;
	}
	.meng-item1>span>span {
		padding-top: 0.2rem;
		display: flex;
		align-items: center;
	}
	.meng-item1>span>span>p {
		font-size: 0.26rem;
	}
	.meng-item1>span>span>h4 {
		font-size: 0.26rem;
		font-weight: normal;
	}
	.meng-item>p {
		padding-top: 0.3rem;
		font-size:0.26rem;
		color: #999999;
	}
	.plus {
		margin-top: 0.2rem;
		font-size:0.26rem;
		display: flex;
		align-items: center;
		/*justify-content: center;*/
	}
	.plus>span {
		text-align: center;
		width: 1rem;
		height: 0.6rem;
		/*display: inline-block;*/
		line-height:0.6rem;

	}
	.plus>span>img {
		width: 1rem;
		height: 0.6rem;
	}
	.plus>span.count {
		border: 1px solid #e9e9e9;
		background-color: #f4f4f4;
		border-radius: 0.1rem;
	}
	.meng-item>input {
		position: absolute;
		bottom: 0.2rem;
		width: 90%;
		height: 0.84rem;
		background-color: #bf1111;
		border-radius: 0.4rem;
		font-size: 0.26rem;
		color: #ffffff;
		outline: none;
	}

	.content-wrapper {
		/*flex-grow: 1;*/
		/*overflow: auto;*/
		border-top: 0.02rem solid rgb(230,230,230);
		padding: 0.2rem;
	}
	.content-wrapper>ul {
		margin-right: -0.2rem;
	}
	.content-wrapper>ul>li {
		box-sizing: border-box;
		float: left;
		width: 50%;
		padding-right: 0.2rem;
		margin-bottom: 0.4rem;
	}
	.content-wrapper>ul>li>a {
		display: flex;
		flex-direction: column;
	}
	.content-wrapper>ul>li>a>.avatar-wrapper {
		background-color: rgba(0,0,0,0.02);
		width: 100%;
		padding-top: 100%;
		position: relative;
	}
	.content-wrapper>ul>li>a>.avatar-wrapper>img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
	}
	.content-wrapper>ul>li>a>p {
		background-color: rgb(246,242,241);
		color: rgb(159,128,82);
		height: 0.64rem;
		line-height: 0.64rem;
		text-indent: 0.1rem;
	}
	.content-wrapper>ul>li>a>h3 {
		color: rgb(51,51,51);
		font-weight: normal;
		height: 0.64rem;
		line-height: 0.64rem;
		text-indent: 0.1rem;
	}
	.content-wrapper>ul>li>a>span {
		font-size: 0.28rem;
		text-indent: 0.1rem;
		color: rgb(182,9,9)
	}
	.jian {
		margin: 0.25rem;
		text-align: center;
	}
	.jian>h4 {
		font-weight: normal;
		font-size: 0.38rem;
	}
</style>