<template>
	<div class="page-wrapper">
		<div class='header'>
			<div class='logo'>
				<img src="images/logo.png" alt="">
			</div>
			<div class='search'>
				<input type="text" value="有品心动卡">
			</div>
			<div class='mail'>
				<img src="images/mail.png" alt="">
			</div>
		</div>
		<div class="content">
			<div class="left" ref="left">
				<ul class="category-main" v-if="mainList.length > 0">
					<li v-for="item in mainList" :key="item.id" :class="{ active: item.id === curCid }" @click="initSubLists(item.id)">
						<span v-text="item.name"></span>
					</li>
				</ul>
				<p v-else>当前分类暂无一级分类，敬请期待</p>
			</div>
			<div class="right" ref="right">
				<div>
					<div class="avatar-wrapper" v-if="avatar">
						<img :src="avatar" alt="" class="avatar">
					</div>
					<ul class="category-sub clearfix" v-if="subList.length > 0">
						<li v-for="item in subList" :key="item.id">
							<router-link :to="`/list/${ curCid }/${ item.id }`">
								<img :src="item.avatar" />
								<span v-text="item.name"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>当前分类暂无二级分类，敬请期待</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<YpNav></YpNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from "better-scroll";
	import imagesLoaded from "imagesloaded";
	import YpNav from "../components/YpNav.vue";
	import { createNamespacedHelpers } from "vuex";

	let { mapState,mapGetters,mapActions }  = createNamespacedHelpers("category");

        export default {
                components: { YpNav },
                computed: {
                        ...mapState([ 'mainList', 'curCid' ]),
                        ...mapGetters([ 'subList' ]),
                        avatar() {
                                if(this.curCid === 0) return '';
                                else return this.mainList.find(item => item.id === this.curCid).avatar;
                        }
                },
	        methods: {
		        ...mapActions(["initMainList", "initSubLists"]),
		        _initLeftScroll() {
		                if(!this.leftScroll) this.leftScroll = new BScroll(this.$refs.left, { click: true })
		        },
		        _initAndRefreshRightScroll() {
		                imagesLoaded(this.$refs.right, () => {
		                        this.$nextTick(() => {
		                                if(!this.rightScroll) this.rightScroll = new BScroll(this.$refs.right, { click: true });
		                                else {
		                                        this.rightScroll.scrollTo(0,0);
		                                        this.rightScroll.refresh();
		                                }
		                        });
		                });
		        }
	        },
	        created: function() {
                        this.initMainList();
	        },
	        updated: function() {
                        this._initLeftScroll();
                        this._initAndRefreshRightScroll();
	        }
        };
</script>

<style scoped>
	.header {
		box-sizing: border-box;
		height: 0.8rem;
		flex: none;
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
		flex: 1;
		/* background-color: red; */
		overflow: auto;
		display: flex;
		border-top: 0.02rem solid #ccc;
		border-bottom: 0.02rem solid #ccc;
	}
	.content>.left  {
		width: 1.5rem;
		flex-shrink: 0;
		border-right: 1px solid #ccc;
		overflow: hidden;
	}
	.content>.right {
		flex-grow: 1;
		overflow: hidden;
	}
	.left li { padding: 0.2rem 0;}
	.left li>span {
		display: block;
		height: 0.48rem;
		line-height: 0.48rem;
		color: rgb(51,51,51);
		border-left: 0.06rem solid transparent;
	}
	.left li.active>span {
		color: rgb(132,95,63);
		border-left-color: rgb(132,95,63);
	}

	.right>div>ul {}
	.right>div>ul>li {
		box-sizing: border-box;
		width:33.333333%;
		padding: 0.26rem;
		float: left;
		text-align: center;
	}
	.right>div>ul>li>a {
		display: block;
		color: black;
	}
	.right>div>ul>li>a>img {
		width: 100%;
	}
	.avatar-wrapper {
		padding: 0.26rem 0.26rem 0 0.26rem;
	}
	.avatar-wrapper>img {
		width: 100%;
	}
	.footer {
		height: 1rem;
		flex: none;
	}
</style>