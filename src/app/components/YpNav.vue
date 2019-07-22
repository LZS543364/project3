<template>
	<ul class="nav">
		<li>
			<router-link to="/" exact>
				<i></i><span>首页</span>
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<i></i><span>分类</span>
			</router-link>
		</li>
		<li>
			<router-link to="/taste">
				<i></i><span>品味</span>
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<i></i><span>购物车</span>
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<i></i><span>个人</span>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	ul.nav
		height: 1rem
		display: flex
		li
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			a
				flex-grow: 1;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;
				color: rgb(132,95,63);
				i
					width: 0.48rem;
					height: 0.48rem;
					background-repeat: no-repeat;
					background-image: url(../assets/images/nav_bg.png);
					background-size: 0.48rem 4.8rem;
			&:nth-child(1)>
			a>i
				background-position: 0 0
				a.active>i
					background-position: 0 11.111111%
			&:nth-child(2)
				a>i
					background-position: 0 22.222222%
				a.active>i
					background-position: 0 33.333333%
			&:nth-child(3)
				a>i
					background-position: 0 44.444444%
				a.active>i
					background-position: 0 55.555555%
			&:nth-child(4)
				a>i
					background-position: 0 66.666666%
				a.active>i
					background-position: 0 77.777777%
			&:nth-child(5)
				a>i
					background-position: 0 88.888888%
				a.active>i
					background-position: 0 99.999999%
</style>