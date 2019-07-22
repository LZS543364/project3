<template>
	<div class="yp-alert" v-show="isShow" >
		<div class="content">
			<h2>提示</h2>
			<p v-text="message"></p>
			<button @click="close">关闭</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from "vuex";
	let { mapState, mapMutations } = createNamespacedHelpers("alert");

        export default {
                computed: mapState([ "isShow", "message" ]),
	        methods: mapMutations([ "close" ])
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.yp-alert
		position: fixed
		left: 0
		top: 0
		width: 100%
		height: 100%
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 20;
		.content
			width: 80%
			position: absolute
			left: 50%
			top: 50%
			transform:translate(-50%,-50%)
			background-color: #fff
			display: flex
			flex-direction: column
			align-items: center
			border-radius: 15px
			h2
				text-align: center
				color: crimson
			p
				padding-top: 20px
				color: gold
				text-align: center
			button
				font-size: 24px
				margin: 25px 0
				width: 30%
				background-color: darkslateblue
				color: white
				padding: 10px
</style>