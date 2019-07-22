<template>
	<div class="login-phone">
		<div class="form-item-wrapper">
			<label for="">+86&gt;</label>
			<input type="tel" placeholder="手机号码" class="phone" v-model="loginInfo.phone">
		</div>
		<div class="form-item-wrapper">
			<input type="text" placeholder="短信验证码" class="code2" v-model="loginInfo.code">
			<button class="code" v-text="code" @click="getCode"></button>
		</div>
		<button class="btn-phone" @click="login">立即登录/注册</button>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cookies from "js-cookie";

        export default {
		data: function() {
		        return {
		                loginInfo: { phone: "", code: "" },
			        code: "获取验证码",
		        };
		},
                methods: {
                        getCode: function() {
                                this.$http({ url: "/login/getcode" })
                                        .then(data => this.code = data)
                        },
                        login: function() {
                                if(this.code !== this.loginInfo.code.toUpperCase()) {
                                        this.$store.commit("alert/open", "验证码错误。。。");
                                        return;
                                }
                                this.$http({
                                        method: "post",
                                        url: "/login/phone",
                                        data: this.loginInfo
                                })
                                        .then(data => {
                                                this.$router.replace(Cookies.get("target") || "/")
                                        });
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.form-item-wrapper
		display: flex
		border-bottom: 0.02rem solid #d3d3d3
		height: 1.1rem
		input
			flex-grow: 1
			border: none
			outline: none
			font-size: 0.24rem
		button.code
			width: 1.4rem
			border: none
			outline: none
			background-color: white
			color: #c49c63
			font-size: 0.24rem
		label
			align-self: center
			font-size: 0.32rem
			padding-right: 0.1rem
			color: #9b9b9b
	button[class^=btn]
		width: 100%
		height: 0.7rem
		line-height: 0.7rem
		text-align: center
		background-color: #E4BB7E
		color: white
		border: none
		outline: none
		font-size: 0.32rem
		border-radius: 0.5rem
		margin: 0.4rem 0
		box-shadow: 0 0.08rem 0.04rem #f1eadf
</style>