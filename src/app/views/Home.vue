<template>
	<div class="wrapper">
		<div class="header w">
			<div class='logo'>
				<img src="../assets/images/logo.png" alt="">
			</div>
			<div class='search'>
				<input type="text" value="有品心动卡">
			</div>
			<div class='mail'>
				<img src="../assets/images/std_titlebar_home_message.png" alt="">
			</div>
		</div>
		<div class="content w">
			<div class="w banner clearfix">
				<div class="banner" ref="banner">
					<ul class="clearfix">
						<li><img src="../assets/images/home/1.jpg" alt=""></li>
						<li><img src="../assets/images/home/2.jpg" alt=""></li>
						<li><img src="../assets/images/home/3.jpg" alt=""></li>
						<li><img src="../assets/images/home/4.jpg" alt=""></li>
						<li><img src="../assets/images/home/5.jpg" alt=""></li>
					</ul>
				</div>
			</div>
			<div class="content-items">
				<div class="content-item1">
					<ul>
						<li><img src="../assets/images/home/img.jpg" alt=""></li>
						<li><img src="../assets/images/home/img1.jpg" alt=""></li>
						<li><img src="../assets/images/home/img2.jpg" alt=""></li>
						<li><img src="../assets/images/home/img3.jpg" alt=""></li>
						<li><img src="../assets/images/home/img4.jpg" alt=""></li>
					</ul>
				</div>
				<span class="content-item2">
			<img src="../assets/images/home/img5.jpg" alt="">
		</span>
				<div class="contengt-item3">
					<h3>有品推荐</h3>
					<span class="more">
				<p>更多</p>
				<img src="../assets/images/home/jiantou.png" alt="">
			</span>
				</div>
				<div class="content-item4">
					<ul>
						<li>
							<img src="../assets/images/home/img6.jpg" alt="">
						</li>
						<li>
							<img src="../assets/images/home/img7.jpg" alt="">
						</li>
					</ul>
				</div>
				<div class="contengt-item3 an">
					<h3>每日更新</h3>
					<span class="more">
				<p>更多</p>
				<img src="../assets/images/home/jiantou.png" alt="">
			</span>
				</div>
				<div class="content-item5">
					<ul>
						<li>
							<h4>美的玉瓷恒温燃气热水器</h4>
							<p>￥2399</p>
						</li>
						<li>
							<div class="right-top">
								<img src="../assets/images/home/a2.png" alt="">
								<h4>美的零冷水燃气热水器</h4>
								<p>￥2200</p>
							</div>
							<div class="right-bottom">
								<img src="../assets/images/home/a3.png" alt="">
								<h4>云米互联网冰箱415L</h4>
								<p>￥2700</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="contengt-item3 bn">
					<h3>热门</h3>
					<span class="more">
				<p>更多</p>
				<img src="../assets/images/home/jiantou.png" alt="">
			</span>
				</div>
				<div class="content-item6">
					<ul>
						<li>
							<span>石头扫地机器人扫拖一体</span>
							<p>￥2399</p>
						</li>
						<li>
							<span>智能自然风扇</span>
							<p>￥599</p>
						</li>
					</ul>
				</div>
				<div class="contengt-item3 cn">
					<h3>品牌</h3>
					<span class="more">
				<p>更多</p>
				<img src="../assets/images/home/jiantou.png" alt="">
			</span>
				</div>
				<div class="content-item7">
					<div class="brand" ref="brand">
						<ul>
							<li><img src="../assets/images/home/img17.jpg" alt=""></li>
							<li><img src="../assets/images/home/img10.jpg" alt=""></li>
							<li><img src="../assets/images/home/img11.jpg" alt=""></li>
							<li><img src="../assets/images/home/img12.jpg" alt=""></li>
							<li><img src="../assets/images/home/img13.jpg" alt=""></li>
							<li><img src="../assets/images/home/img14.jpg" alt=""></li>
							<li><img src="../assets/images/home/img15.jpg" alt=""></li>
							<li><img src="../assets/images/home/img16.jpg" alt=""></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="footer w">
			<YpNav></YpNav>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
        import BScroll from 'better-scroll';
        import imagesLoaded from 'imagesloaded';
        import YpNav from "../components/YpNav.vue"

        export default {
                components: { YpNav },
                mounted() {
                        imagesLoaded(this.$refs.banner, () => {
                                this.$nextTick(() => {
                                        this.bannerScroll = new BScroll(this.$refs.banner, {
                                                scrollX: true,
                                                scrollY: false,
                                                momentum: false, //关闭惯性滚动
                                                snap: {
                                                        loop: true,
                                                        threshold: 0.2  //触发滚动的临界距离
                                                }
                                        });
                                        this.bannerScroll.on('scrollStart', () => clearTimeout(this.timer));
                                        this.bannerScroll.on('scrollEnd', () => this.timer = setTimeout(() => this.bannerScroll.next(), 3000));
                                        this.timer = setTimeout(() => this.bannerScroll.next(), 3000);
                                });
                        });
                        imagesLoaded(this.$refs.brand, () => {
                                this.$nextTick(() => {
                                        new BScroll(this.$refs.brand, {
                                                scrollX: true,
                                                scrollY: false,
                                                momentum: false, //关闭惯性滚动
                                                snap: {
                                                        loop: true,
                                                        threshold: 0.2  //触发滚动的临界距离
                                                }
                                        });
                                });
                        });
                },
        };
</script>

<style scoped>
	html,body {
		height:100%;
		width:100%;
		/*font-size: 50px;*/
	}
	div.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.24rem;
	}
	/*body {*/
		/*display: flex;*/
		/*flex-direction: column;*/
		/*font-size: 0.24rem;*/
	/*}*/
	.w{
		width: 6.9rem;
		margin: 0 auto;
	}
	.header {
		box-sizing: border-box;
		height: 0.8rem;
		flex-shrink: 0;
		display: flex;
		padding: 0.1rem 0;
		justify-content: center;
	}
	.header>div {
		display: flex;
	}
	.header>div:nth-child(1) {
		align-items: flex-start;
		justify-content: center;
	}
	.header>div:nth-child(2) {
		flex-grow: 1;
	}
	.header>div:nth-child(3) {
		align-items: flex-end;
		justify-content: center;
	}
	.logo {

	}
	.logo>img {
		width: 1.28rem;
		height: 0.56rem;
	}
	.search {
	}
	.search>input {
		flex-grow: 1;
		border: 1px solid #ccc;
	}
	.mail {/*
	align-items: center;
	justify-content: center; */
	}
	.mail>img {
		height: 0.56rem;
		width: 0.56rem;
	}

	.content {
		flex-grow: 1;
		overflow: auto;
	}

	.banner {
		width: 100%;
		/*height: 3.7rem;*/
		flex-shrink: 0;
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
	.brand {
		width: 100%;
		/*height: 3.7rem;*/
		flex-shrink: 0;
		overflow: hidden;
	}
	.brand>ul {
		width: 700%;
		height: 100%;
	}
	.brand>ul>li {
		/*width: 14.28571428571429%;*/
		height: 100%;
		float: left;
	}
	.brand>ul>li>img {
		width: 100%;
	}
	.content-item1 {}
	.content-item1>ul {
		display: flex;
		flex-direction: row;
	}
	.content-item1>ul>li {
		width: 20%;
	}
	.content-item1>ul>li>img {
		width: 100%;
	}
	.content-item2 {
		display: block;
	}
	.content-item2>img {
		width: 100%;
	}

	.contengt-item3 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:10px 4px 10px 6px;
	}
	.contengt-item3>h3 {
		font-size: .30rem;
		color: #333333;
		font-weight: normal;
	}
	.contengt-item3>span {
		display: flex;
		justify-content: center;
	}
	.contengt-item3>span>p {
		display: inline-block;
		color: #999999;
		font-size: 26px;
	}
	.contengt-item3>span>img {
		width: 17px;
		height:17px;
		padding-top: 10px;
	}
	.content-item4 {
		/*display: flex;*/
		/*justify-content:space-between;*/
	}
	.content-item4>ul {
		display: flex;
		justify-content: space-around;
	}
	.content-item4>ul>li {
		width: 50%;
	}
	.content-item4>ul>li>img {
		width:100%;
	}
	.content-item5 {}
	.content-item5>ul {
		display: flex;
	}
	.content-item5>ul>li {
		width:50%;
	}
	.content-item5>ul>li:nth-child(1) {
		background-image: url(../assets/images/home/a1.png);
		background-size: 120% auto ;
		background-repeat: no-repeat;
		background-position: center center;
	}
	.content-item5>ul>li>h4 {
		font-weight: normal;
		font-size: 26px;
		padding-left:20px;
	}
	.content-item5>ul>li>p {
		padding-top:5px;
		color: #c04343;
		font-size: 24px;
		padding-left:20px;
	}
	.content-item5>ul>li>div {}
	.content-item5>ul>li>div>h4 {
		font-weight: normal;
		padding-left:20px;
		font-size: 26px;
	}
	.content-item5>ul>li>div>p {
		padding-left:20px;
		font-size: 24px;
	}
	.content-item5>ul>li>div>img {
		width: 1.72rem;
		height:1.72rem;
		padding-left:70px;
	}
	.content-item6 {}
	.content-item6>ul {
		display: flex;
	}
	.content-item6>ul>li:nth-child(1) {
		width:50%;
		height:2.72rem;;
	background-image: url("../assets/images/home/a4.png");
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 100% auto;
	}
	.content-item6>ul>li:nth-child(2) {
		width:50%;
		height:2.72rem;
		background-image: url("../assets/images/home/ima.jpg");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100% auto;
	}
	.content-item6>ul>li>span {
		font-size:26px;
		padding-left:20px;
	}
	.content-item6>ul>li>p {
		color: #c04343;
		font-size:28px;
		padding-left:20px;
	}

</style>