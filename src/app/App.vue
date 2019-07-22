<template>
	<div class="root">
		<YpAlert></YpAlert>
		<Keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</Keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
        import YpAlert from './components/YpAlert.vue'

        export default {
                components: {
                        YpAlert
                }
        }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width:100%
		height:100%
</style>
