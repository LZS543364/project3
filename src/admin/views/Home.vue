<template>
	<el-container class="mi-home">
		<el-aside width="auto">
			<HomeNav></HomeNav>
		</el-aside>
		<el-container>
			<el-header>
				<h1>小米后台管理系统</h1>
				<div class="out">
					<span v-text="name"></span>
					<span @click="logout">退出登录</span>
				</div>
			</el-header>
			<el-main>
				<HomeTab></HomeTab>
			</el-main>
			<el-footer>
				<p>&copy;版权所有思途1903H5全体师生</p>
				<p>tel: 1388888888</p>
				<p>email: 168967980@qq.com</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
        import HomeNav from "../components/HomeNav.vue";
        import HomeTab from "../components/HomeTab.vue";
        import { createNamespacedHelpers } from "vuex";
        let { mapState,mapMutations } = createNamespacedHelpers("login");

        export default {
                components: { HomeNav, HomeTab },
	        computed: {
		        ...mapState(["name"])
	        },
	        methods: {
		        ...mapMutations(["logout"])
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-home
		width: 100%
		height: 100%
		.el-aside
			background-color: #FAFAD2
		.el-header
			background-color: 	#D1EEEE
			display: flex
			align-items: center
			justify-content: space-between
			h1
				color: #8B2252
				font-size: 28px
			.out
				color: #0000FF
				cursor: pointer
				span
					margin-left: 10px
		.el-footer
			background-color: #b8b8b8
			display: flex
			align-items: center
			p
				color: #fff
				font-size: 12px
				font-weight: normal
				margin-right: 50px
</style>